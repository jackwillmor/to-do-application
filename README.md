# To-Do Application

To-Do Application is a monolithic application functioning a basic todo list built in Laravel and ReactJS.

## Dependencies

- PHP 8.2 or higher
- Node >= v20.17.0
- npm >= 10.8.2

## Installation

Clone the repository and install composer packages

```bash
composer install
```

Update database in .env 
```yaml
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE="<DATABASE_NAME>"
DB_USERNAME="<USERNAME>"
DB_PASSWORD="<PASSWORD>"
```

Run migrations
```bash
php artisan migrate
```

Run fixtures
```bash
php artisan migrate:fresh --seed
```

Clear caches
```bash
php artisan optimize
```

Run npm install

```bash
npm install
```

## Usage

Run the following command to serve a local version on: http://127.0.0.1:8000
```bash
php artisan serve
```

## Tests

The following tests for backend are:
```bash
php vendor/bin/codecept run Api tests/Api/TasksCest.php
```

Tests for the frontend can be ran:
```bash
npm test
```
