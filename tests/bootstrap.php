<?php

require __DIR__.'/../vendor/autoload.php';
if (method_exists(Dotenv::class, 'bootEnv')) {
    (new Dotenv())->bootEnv(dirname(__DIR__).'/.env.testing');
}
