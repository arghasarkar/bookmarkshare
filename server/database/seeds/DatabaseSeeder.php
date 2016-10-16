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
        $this->call(HUserTableSeeder::class);
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