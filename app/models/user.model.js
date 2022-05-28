const sql = require("./db.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// constructor
const User = function (book) {
    this.name = book.name;
    this.id_role = book.id_role;
    this.password = book.password;
    this.email = book.email;
    this.last_login = book.last_login;
};


User.create = (newUser, result) => {

    sql.query(`SELECT * FROM user WHERE LOWER(email) = LOWER(${sql.escape(newUser.email)});`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        console.log("sql.query  -  res", res);
        if(!res.length){
            bcrypt.hash(newUser.password, 10, (err, hash) => {
                if (err) {
                    result(err, null);
                } else {
                    // has hashed pw => add to database

                    sql.query("INSERT INTO user SET ?", {...newUser,password: hash}, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                
                        console.log("created newUser: ", { id: res.insertId, ...newUser });
                        result(null, { id: res.insertId, ...newUser });
                    });

                }
            });
        }else{
            result({ kind: "user_in_use" }, null);
        }
    });
};

User.login = (user, result) => {

    sql.query(`SELECT user.*,role.name as role FROM user inner join role on user.id_role = role.id WHERE LOWER(email) = LOWER(${sql.escape(user.email)});`, (err, res) => {
        
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        if(res.length){
            const {name, email, id_role,id,password,role } = res[0]
            
            
            bcrypt.compare(user.password, password, (err, hash) => {
                if (err) {
                    result(err, null);
                    
                } else{
                   
                    if (hash) {
                        const token = jwt.sign({ id}, 'the-super-strong-secrect', { expiresIn: '1h' });
                        sql.query(
                            `UPDATE user SET last_login = now() WHERE id = '${id}'`
                        );
                      
                        

                        result(null, { token, name, email, id_role,id,role });
                    }else{
                        result({kind: 'bad_credentials'}, null);
                    }
                }
            });
        }else{
            result({ kind: "bad_credentials" }, null);
        }
    });
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM book WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found book: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};


User.getAll = result => {
    sql.query("SELECT user.id,user.name,user.email,role.name as role FROM user inner join role on role.id = user.id_role", (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("book: ", data);
        result(null, {data : data});
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user SET name = ?, password = ?,email = ? WHERE id = ?",
        [user.name, user.password, user.email,id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};


User.remove = (id, result) => {
    sql.query("DELETE FROM book WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted book with id: ", id);
        result(null, res);
    });
};

module.exports = User;