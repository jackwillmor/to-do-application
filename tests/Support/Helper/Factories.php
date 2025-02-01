<?php

namespace Tests\Support\Helper;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

use League\FactoryMuffin\Faker\Facade as Faker;

class Factories extends \Codeception\Module
{

    public function _beforeSuite($settings = [])
    {
        $factory = $this->getModule('DataFactory');
        $faker = Faker::instance()->getGenerator();
    }
}
