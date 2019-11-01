var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("ID: " + connection.threadId);
});

var Products = function() {
    var query = "Select * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Type", "Price", "Quantity"],
            colWidths: [15, 35, 35, 15, 20]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        userPrompt();
    });
}

function userPrompt() {
    inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "Please enter Item ID",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many items?",
            filter: Number
        },

    ]).then(function(answers) {
        var quantityNeeded = answers.Quantity;
        var IDrequested = answers.ID;
        purchase(IDrequested, quantityNeeded);
    });
};

function purchase(ID, amtNeeded) {
    connection.query('Select * FROM products WHERE item_id = ' + ID, function(err, res) {
        if (err) { console.log(err) };
        if (amtNeeded <= res[0].stock_quantity) {
            var totalCost = res[0].price * amtNeeded;
            console.log("Item in stock");
            console.log("Total items: " + amtNeeded + " " + res[0].product_name + " Cost: " + totalCost + " Thank you! Enjoy your purchase!");

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
        } else {
            console.log("Not enough product in stock " + res[0].product_name);
        };
        Products();
    });
};

Products();