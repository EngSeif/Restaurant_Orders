-- MySQL Dump Script for Orders_System Database

-- Drop the database if it already exists and recreate it
DROP DATABASE IF EXISTS Orders_System;
CREATE DATABASE Orders_System;
USE Orders_System;

-- Table structure for `Client`
CREATE TABLE Client (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Data for table `Client`
INSERT INTO Client (firstname, lastname, email, password) VALUES
('John', 'Doe', 'john.doe@example.com', 'hashedpassword1'),
('Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'hashedpassword3'),
('Bob', 'Williams', 'bob.williams@example.com', 'hashedpassword4'),
('Charlie', 'Brown', 'charlie.brown@example.com', 'hashedpassword5'),
('Emily', 'Davis', 'emily.davis@example.com', 'hashedpassword6'),
('Daniel', 'Miller', 'daniel.miller@example.com', 'hashedpassword7'),
('Sophia', 'Wilson', 'sophia.wilson@example.com', 'hashedpassword8'),
('James', 'Taylor', 'james.taylor@example.com', 'hashedpassword9'),
('Olivia', 'Anderson', 'olivia.anderson@example.com', 'hashedpassword10');

-- Table structure for `Restaurant`
CREATE TABLE Restaurant (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_name VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Data for table `Restaurant`
INSERT INTO Restaurant (restaurant_name, phone, email, password) VALUES
('Pizza Palace', '123-456-7890', 'contact@pizzapalace.com', 'hashedpassword11'),
('Burger Bistro', '987-654-3210', 'contact@burgerbistro.com', 'hashedpassword12'),
('Sushi Spot', '345-678-9012', 'contact@sushispot.com', 'hashedpassword13'),
('Taco Town', '765-432-1098', 'contact@tacotown.com', 'hashedpassword14'),
('Pasta Paradise', '321-654-9870', 'contact@pastaparadise.com', 'hashedpassword15'),
('BBQ Barn', '456-789-0123', 'contact@bbqbarn.com', 'hashedpassword16'),
('Vegan Village', '654-321-0987', 'contact@veganvillage.com', 'hashedpassword17'),
('Seafood Shack', '567-890-1234', 'contact@seafoodshack.com', 'hashedpassword18'),
('Breakfast Bistro', '789-012-3456', 'contact@breakfastbistro.com', 'hashedpassword19'),
('Dessert Den', '890-123-4567', 'contact@dessertden.com', 'hashedpassword20');

-- Table structure for `Meal`
CREATE TABLE Meal (
    meal_id INT AUTO_INCREMENT PRIMARY KEY,
    meal_name VARCHAR(50) NOT NULL,
    meal_description VARCHAR(255) NOT NULL,
    price FLOAT,
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id)
);

-- Data for table `Meal`
INSERT INTO Meal (meal_name, meal_description, price, restaurant_id) VALUES
('Pepperoni Pizza', 'Delicious pepperoni pizza with extra cheese', 12.99, 1),
('Cheeseburger', 'Juicy cheeseburger with fresh lettuce and tomato', 9.99, 2),
('California Roll', 'Fresh sushi roll with avocado and crab', 8.99, 3),
('Fish Tacos', 'Grilled fish tacos with spicy salsa', 10.49, 4),
('Spaghetti Carbonara', 'Classic Italian pasta dish with creamy sauce', 13.99, 5),
('BBQ Ribs', 'Smoky and tender BBQ ribs', 15.99, 6),
('Vegan Burger', 'Plant-based burger with vegan cheese', 11.49, 7),
('Grilled Salmon', 'Fresh salmon with a lemon butter sauce', 17.99, 8),
('Pancake Stack', 'Fluffy pancakes with maple syrup', 7.99, 9),
('Chocolate Cake', 'Rich and moist chocolate cake', 6.99, 10);

-- Table structure for `Orders`
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    meal_id INT,
    status VARCHAR(50) NOT NULL,
    date_of_order DATE,
    FOREIGN KEY (client_id) REFERENCES Client(client_id),
    FOREIGN KEY (meal_id) REFERENCES Meal(meal_id)
);

-- Data for table `Orders`
INSERT INTO Orders (client_id, meal_id, status, date_of_order) VALUES
(1, 1, 'Completed', '2025-01-01'),
(2, 2, 'Pending', '2025-01-02'),
(3, 3, 'In Progress', '2025-01-03'),
(4, 4, 'Completed', '2025-01-04'),
(5, 5, 'Cancelled', '2025-01-05'),
(6, 6, 'Completed', '2025-01-06'),
(7, 7, 'In Progress', '2025-01-07'),
(8, 8, 'Pending', '2025-01-08'),
(9, 9, 'Completed', '2025-01-09'),
(10, 10, 'Completed', '2025-01-10');
