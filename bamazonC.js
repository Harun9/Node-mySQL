//importing mysql from the package
var mysql = require("mysql");
var inquirer = require('inquirer');

// This are object variable which are used for connecting to mySQl database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

// here we will create call back function to confirm if connection was successful:

connection.connect(function (err) {
    if (err) throw (err);
    console.log("connection is successfull");

});

var showTable = 'SELECT *FROM products';
connection.query(showTable, function (error, results, ) {
    for (var i = 0; i < results.length; i++) {
        if (error) throw error;
        console.log(result[i].itemID + " || " + result[i].product_name + " || " +
            result[i].department_name + " || " + result[i].price + " || " + result[i].stock_quantity + "\n");

    }

});