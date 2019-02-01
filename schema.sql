DROP IF DATABASE EXISTS reservation_db;

CREATE DATABASE reservation_db;

USE reservation_db;

CREATE TABLE reservations (
res_id INT NOT NULL AUTO_INCREMENT,
res_name VARCHAR(50) NOT NULL,
res_phone INT(10)


);