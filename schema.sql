DROP DATABASE IF EXISTS reservation_db;

CREATE DATABASE reservation_db;

USE reservation_db;

CREATE TABLE reservations (
res_id INT NOT NULL AUTO_INCREMENT,
res_name VARCHAR(50) NOT NULL,
res_phone VARCHAR(10) NOT NULL,
res_email VARCHAR(50) NOT NULL,
res_unique_id INT(5) NOT NULL,
PRIMARY KEY (res_id)
);

SELECT * FROM reservations;