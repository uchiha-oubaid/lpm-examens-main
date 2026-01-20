const fs = require('fs');

function writeDb(obj, name="db.json") {
    // checking if there is no data
    if (!obj) { return console.log("Please provide data!"); }

    try {
        fs.writeFileSync(name, JSON.stringify(obj));

        return console.log("Save successful!");
    } catch (err) {
        return console.log("something went wrong...");
    }
}

function readDb(name="db.json") {
    const data = fs.readFileSync(name, "utf-8");
    return JSON.parse(data);
}

module.exports = {writeDb, readDb};