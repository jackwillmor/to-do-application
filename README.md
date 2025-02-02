# To-Do Application

To-Do Application is a monolithic application functioning a basic todo list built in Laravel and ReactJS.

## Installation

Clone the repository and install composer and node packages

```bash
composer install

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
