-- Criação do banco de dados.

DROP DATABASE IF EXISTS sistema_eventos;

CREATE DATABASE IF NOT EXISTS sistema_eventos;

-- Criaçao das tabelas.
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('organizador', 'participante', 'administrador') NOT NULL
);

CREATE TABLE IF NOT EXISTS eventos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    images TEXT
);

CREATE TABLE IF NOT EXISTS registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    evento_id INT NOT NULL,
    payment_status ENUM('pending', 'completed') NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    evento_id INT NOT NULL,
    score INT NOT NULL,
    comment TEXT
);

CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

ALTER TABLE eventos
ADD FOREIGN KEY (category_id) REFERENCES categories(id);

ALTER TABLE registrations
ADD FOREIGN KEY (user_id) REFERENCES users(id),
ADD FOREIGN KEY (evento_id) REFERENCES eventos(id);

ALTER TABLE reviews
ADD FOREIGN KEY (user_id) REFERENCES users(id),
ADD FOREIGN KEY (evento_id) REFERENCES eventos(id);