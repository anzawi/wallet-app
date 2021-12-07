<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('payments')->insert([
            'name' => 'Visa Card',
            'currencies' => '["JOD", "USD"]',
            'img' => 'img-uri',
            'min_deposit' => 20,
            'max_deposit' => 500,
            'min_withdrawal' => 50,
            'max_withdrawal' => 200,
            'slug' => Str::uuid(),
        ]);
    }
}
