const mysql = require("mysql2");

// Подключаемся к серверу MySQL
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nazareth127" 
});

// Создаем базу данных
connection.query("CREATE DATABASE IF NOT EXISTS testdb", (err, result) => {
    if (err) throw err;
    console.log("База данных testdb создана или уже существует");

    // Подключаемся к новой базе данных
    const dbConnection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Nazareth127",
        database: "testdb"
    });

    // Создаем таблицу users
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    dbConnection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Таблица users создана или уже существует");

        // Вставляем тестовые данные
        const insertQuery = `
            INSERT INTO users (name, email)
            VALUES 
            ('Alice', 'alice@example.com'),
            ('Bob', 'bob@example.com')
        `;

        dbConnection.query(insertQuery, (err, result) => {
            if (err) throw err;
            console.log("Данные успешно добавлены");
            dbConnection.end(); // Закрываем подключение
        });
    });
});
