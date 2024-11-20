const mysql = require("mysql2");
  
const connection = mysql.createConnection({
    host: "localhost",  //host: хост, на котором запущен сервер mysql. По умолчанию имеет значение "localhost"
    user: "root", // user: пользователь MySQL, который используется для подключения
  //   database: "usersdb", // database: имя базы данных, к которой идет подключение. Необязательный параметр. Если он не указан, то подключение идет в целом к северу
    password: "Nazareth127" // password: пароль для пользователя MySQL
});
// тестирование подключения
 connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });
 // закрытие подключения
 connection.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});