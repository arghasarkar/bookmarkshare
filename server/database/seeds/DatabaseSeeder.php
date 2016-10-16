<?php

use Illuminate\Database\Seeder;

use \App\HUser;
use \App\Skill;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call('HUserTableSeeder');

        $this->call('SkillTableSeeder');
    }
}

class HUserTableSeeder extends Seeder
{

    public function run() {
        DB::table('h_users')->delete();
            
        HUser::create([
            "name" => "Argha",
            "email" => "argha@arghasarkar.co.uk",
            "mob" => "+447554164303"
        ]);

        HUser::create([
            "name" => "Adam",
            "email" => "adam@example.com",
            "mob" => ""
        ]);

        HUser::create([
            "name" => "Gisi",
            "email" => "gisi@example.com",
            "mob" => ""
        ]);

        HUser::create([
            "name" => "Fernando",
            "email" => "fernando@example.com",
            "mob" => ""
        ]);
    }

}

class SkillTableSeeder extends Seeder {

    public function run() {

        DB::table('skills')->delete();

        Skill::create([
            "name" => "Java",
            "description" => "Java programming language."
        ]);

        Skill::create([
            "name" => "Front-end web developer",
            "description" => "Front end web developer"
        ]);

        Skill::create([
            "name" => "OpenCV",
            "description" => "Computer vision library primarily in C++"
        ]);

        Skill::create([
            "name" => "ReactJS",
            "description" => "Javascript library"
        ]);

        Skill::create([
            "name" => "Python",
            "description" => "Python programming language"
        ]);

    }

}