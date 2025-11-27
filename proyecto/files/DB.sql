CREATE DATABASE proyecto;
USE usuarios;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100),
    contraseña VARCHAR(20),
    permisos BOOLEAN DEFAULT false
);