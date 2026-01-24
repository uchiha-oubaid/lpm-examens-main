const {createPool} = require("mysql");

const pool = createPool({
    host: "localhost",
    user: "oubaid",
    password: "YourPassword123!",
    connectionLimit: 10
});

function selectColumns() {
    pool.query(`SELECT * FROM lpmDataBase.users`, (err, res) => {
      console.log(res);
    });
}
