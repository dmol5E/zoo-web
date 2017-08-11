# Веб-приложение для зоопарка #

### Используемый стек технологий ###
* Mongo DB v3.4.6
* Express v4.15.2
* AngularJS v.1.5.0
* NodeJS v8.1.4

### Установка и Запуск ###
* После клонирования репозитория необходимо запустить Mongo DB `mongod`
* Далее произвести установку `npm install` (Дополнительно будет запущен скрипт с инициализацией БД тестовыми данными)
* Запуск осущесвтить командой `npm start`
* В браузере переидти по ссылке `http://localhost:3000`

### Использование ###
Для работы с веб-приложением необходимо зарегистрироваться `sign in` или залогиниться `sign up`.
После аутентификации станет доступна страница `Keeper page`

### Авторизация ###
В приложении по-умолчанию есть два пользователя (если БД была проинициализирована при `npm install`):

* login: `keeper`, password: `12345`
* login: `zoologist`, password: `54321`

У пользователя keeper недоступны кнопки `Назначить смотрителя`, `Назначить клетку`
Также ограничения авторизации можно проверить на REST API вызовах, пользователю keeper недоступны:

* `GET /animals/keepers/`
* `PUT /animals/:id`
