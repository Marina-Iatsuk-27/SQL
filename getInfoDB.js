const mysql = require("mysql2");
require('dotenv').config(); //для паролей
const password = process.env.PASSWORD; // Читаем переменную из .env
const host = process.env.HOST;

// Подключение к базе данных
// const connection = mysql.createConnection({
//   host: "localhost", // Адрес MySQL-сервера
//   user: "root", // Пользователь MySQL
//   password: "Nazareth127", // Пароль пользователя
//   database: "testdb" // Название базы данных
// });

// Подключение к MySQL серверу
const connection = mysql.createConnection({
    host: host, // IP вашего сервера 154.5.87.87
    user: 'root',          // Имя пользователя
    password: password,  // Пароль пользователя root
    database: 'testdata', // Название вашей базы данных
    port: 3306             // Порт MySQL
  });

// Выполнение SQL-запроса для получения всех данных из таблицы users
connection.query("SELECT * FROM users", (err, results) => {
  if (err) {
    console.error("Ошибка выполнения запроса:", err);
    return;
  }

  // Вывод результата
  console.log("Данные из таблицы users:", results);

  // Закрытие соединения
  connection.end();
});
