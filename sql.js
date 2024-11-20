const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",  //host: хост, на котором запущен сервер mysql. По умолчанию имеет значение "localhost"
  user: "root", // user: пользователь MySQL, который используется для подключения
//   database: "usersdb", // database: имя базы данных, к которой идет подключение. Необязательный параметр. Если он не указан, то подключение идет в целом к северу
  password: "Nazareth127" // password: пароль для пользователя MySQL
});
 connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });







// port: номер порта, на котором запущен сервер mysql. По умолчанию имеет значение "3306"



// charset: кодировка для подключения, например, по умолчанию используется "UTF8_GENERAL_CI".

// timezone: часовой пояс сервера MySQL. This is used to type cast server date/time values to JavaScript. По умолчанию имеет значение "local"