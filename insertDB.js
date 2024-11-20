const mysql = require('mysql2');
require('dotenv').config(); //для паролей
const password = process.env.PASSWORD; // Читаем переменную из .env
const host = process.env.HOST;

// Подключение к MySQL серверу
const connection = mysql.createConnection({
    host: host, // IP вашего сервера
    user: 'root',          // Имя пользователя
    password: password,  // Пароль пользователя root
    database: 'testdata',  // Название вашей базы данных
    port: 3306             // Порт MySQL
});

// Устанавливаем соединение
connection.connect(err => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Соединение установлено!');
});

// Данные, которые нужно вставить
const users = [
    { name: 'Иван' },
    { name: 'Мария' },
    { name: 'Алексей' }
];

// Формируем запрос
const query = 'INSERT INTO users (name) VALUES ?';

// Преобразуем данные в нужный формат
const values = users.map(user => [user.name]);

// Выполняем запрос
connection.query(query, [values], (err, result) => {
    if (err) {
        console.error('Ошибка выполнения запроса:', err);
        return;
    }

    console.log('Данные успешно добавлены!');
    console.log('Количество добавленных строк:', result.affectedRows);
});

// Закрываем соединение
connection.end();
