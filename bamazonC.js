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
        askCustomer(results)
    });
}

var askCustomer = function (results) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "what kind of product do you want to purchase today?"

    }

    ])
        .then(function (answer) {
            var correct = false;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                    correct = true;
                    var product = answer.choice;
                    var id = i;

                    inquirer.prompt({

                        type: "input",
                        name: "amount",
                        message: "How many  of this product will you like to purchase?"
                    })
                        .then(function (answer) {
                            if ((results[id].stock_quantity - answer.amount) > 0) {


                                connection.query("UPDATE products SET stockQuantity=" + (results[id].stock_quantity - answer.amount) + "' WHERE productName='" + product + "'", function (error, results) {
                                    console.log(" Thank you just purchased Item!");
                                    showTable();
                                })
                            } else {
                                console.log("the product is not available");
                                askCustomer(results);
                            }




                        })
                }
            }
        })
}

















