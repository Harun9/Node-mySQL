//importing mysql from the package
var mysql = require("mysql");
var inquirer = require('inquirer');
var products = require("cli-products");

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
    showTable();
});
function showTable() {
    var showTable = 'SELECT * FROM products';
    connection.query(showTable, function (error, results) {
        for (var i = 0; i < results.length; i++) {
            if (error) throw error;
            console.log(results[i].itemID + " || " + results[i].product_name + " || " +
                results[i].department_name + " || " + results[i].price + " || " + results[i].stock_quantity + "\n");
        }
    });
}




