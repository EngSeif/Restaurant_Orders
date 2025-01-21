CREATE DATABASE Orders_System;
USE Orders_System;

CREATE TABLE Client (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Restaurant (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_name VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Meal (
    meal_id INT AUTO_INCREMENT PRIMARY KEY,
    meal_name VARCHAR(50) NOT NULL,
    meal_description VARCHAR(255) NOT NULL,
    price FLOAT,
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id)
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    meal_id INT,
    status VARCHAR(50) NOT NULL,
    date_of_order DATE,
    FOREIGN KEY (client_id) REFERENCES Client(client_id),
    FOREIGN KEY (meal_id) REFERENCES Meal(meal_id)
);
