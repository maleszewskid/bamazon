DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (101, "Xbox One", "electronics", 199.99, 20),
	   (225, "Storage Cabinet", "furniture", 169.99, 10),
	   (360, "Mini Fridge Cooler", "furniture", 40.95, 15),
	   (455, "Playstation 5", "electronics", 999.99, 19),
	   (495, "Desktop Monitor", "electronics", 199.99, 20),
	   (555, "Air Conditioner", "electronics", 99.99, 30),
	   (650, "Keurig Coffee Maker", "electronics", 99.99, 40),
	   (703, "Bathroom Mirror", "furniture", 39.99, 25),
	   (757, "Camera", "photography", 750.00, 5),
	   (868, "Sunglasses", "clothing", 59.99, 50)