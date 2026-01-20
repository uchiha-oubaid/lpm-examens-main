const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

class AuthDatabase {
    constructor() {
        this.filePath = path.join('../data/data.json');
        this.data = null;
    }

    // Load database from file
    async load() {
        try {
            const content = await fs.readFile(this.filePath, 'utf8');
            this.data = JSON.parse(content);
        } catch (error) {
            // Initialize with empty database
            this.data = {
                users: [],
                sessions: []
            };
            await this.save();
        }
        return this;
    }

    // Save database to file
    async save() {
        await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
    }

    // User Registration
    async register(username, email, password) {
        await this.load();
        
        // Check if user exists
        const existingUser = this.data.users.find(user => 
            user.username === username || user.email === email
        );
        
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = {
            id: Date.now(),
            username,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        this.data.users.push(newUser);
        await this.save();
        
        return {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        };
    }

    // User Login
    async login(usernameOrEmail, password) {
        await this.load();
        
        // Find user by username or email
        const user = this.data.users.find(user => 
            user.username === usernameOrEmail || user.email === usernameOrEmail
        );
        
        if (!user) {
            throw new Error('User not found');
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        // Create session
        const session = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            userId: user.id,
            username: user.username,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        };

        this.data.sessions.push(session);
        await this.save();

        return {
            sessionId: session.id,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };
    }

    // Verify Session
    async verifySession(sessionId) {
        await this.load();
        
        const session = this.data.sessions.find(s => 
            s.id === sessionId && new Date(s.expiresAt) > new Date()
        );
        
        if (!session) {
            return null;
        }

        const user = this.data.users.find(u => u.id === session.userId);
        
        return {
            sessionId: session.id,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };
    }

    // Logout
    async logout(sessionId) {
        await this.load();
        
        const initialLength = this.data.sessions.length;
        this.data.sessions = this.data.sessions.filter(s => s.id !== sessionId);
        
        if (this.data.sessions.length !== initialLength) {
            await this.save();
            return true;
        }
        
        return false;
    }

    // Get all users (for testing)
    async getAllUsers() {
        await this.load();
        return this.data.users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }));
    }

    // Delete user (admin function)
    async deleteUser(userId) {
        await this.load();
        
        const initialLength = this.data.users.length;
        this.data.users = this.data.users.filter(user => user.id !== userId);
        
        // Also remove user's sessions
        this.data.sessions = this.data.sessions.filter(session => session.userId !== userId);
        
        if (this.data.users.length !== initialLength) {
            await this.save();
            return true;
        }
        
        return false;
    }
}

// Create and export instance
const authDB = new AuthDatabase();
module.exports = authDB;