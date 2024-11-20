const express = require('express');
const mysql = require('mysql2');
 const cors = require('cors'); // Для поддержки CORS-запросов
 require('dotenv').config(); //для паролей

const app = express();
const port = 3000;
const password = process.env.PASSWORD;
const host = process.env.HOST;  // Читаем переменную из .env
// Разрешаем все CORS-запросы
app.use(cors({
    origin: '*',  // Разрешаем все домены
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Разрешаем необходимые методы
    allowedHeaders: ['Content-Type', 'Authorization']  // Разрешаем нужные заголовки
  }));
  

// Создание подключения к MySQL
const connection = mysql.createConnection({
  host: host, // IP вашего сервера 154.5.87.87
  user: 'root',          // Имя пользователя
  password: password, // Пароль пользователя
  database: 'testdata',  // Название вашей базы данных
  port: 3306             // Порт MySQL
});

// Создание API для получения данных из таблицы users
app.get('/data', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error("Ошибка выполнения запроса:", err);
        return res.status(500).json({ error: 'Ошибка запроса' });
      }
      res.json(results); // Отправляем данные в формате JSON
    });
  });
  
  // Обработчик для вставки данных
app.post('/data', express.json(), (req, res) => {
    const { name } = req.body; // Данные из тела запроса
  
    if (!name) {
      return res.status(400).send('Имя обязательно');
    }
  
    const query = 'INSERT INTO users (name) VALUES (?)';
    connection.query(query, [name], (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса:', err);
        return res.status(500).json({ error: 'Ошибка запроса' });
      }
      res.status(200).send(`Пользователь ${name} добавлен в базу данных`);
    });
  });

  // Обработчик для очистки таблицы
  app.delete('/data', (req, res) => {
    const query = 'TRUNCATE TABLE users';
    connection.query(query, (err) => {
      if (err) {
        console.error('Ошибка выполнения запроса:', err);
        return res.status(500).json({ error: 'Ошибка запроса' });
      }
      res.status(200).send('Таблица успешно очищена');
    });
  });

  // Обработчик для удаления записи по имени
app.delete('/data/:name', (req, res) => {
    const name = req.params.name; // Получаем имя из параметров URL
  
    if (!name) {
      return res.status(400).send('Имя обязательно для удаления');
    }
  
    const query = 'DELETE FROM users WHERE name = ?';
    connection.query(query, [name], (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса:', err);
        return res.status(500).json({ error: 'Ошибка запроса' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send(`Пользователь с именем ${name} не найден`);
      }
  
      res.status(200).send(`Пользователь с именем ${name} успешно удалён`);
    });
  });
  
  
// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  });
