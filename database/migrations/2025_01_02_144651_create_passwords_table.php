<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasswordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('passwords', function (Blueprint $table) {
            $table->id('id_password'); 
            $table->string('application_name'); 
            $table->string('password'); 
            $table->string('username')->nullable(); 
            $table->string('email')->nullable(); 
            $table->string('recovery_email')->nullable(); 
            $table->string('phone', 20)->nullable(); 
            $table->string('recovery_phone', 20)->nullable(); 
            $table->date('birth_date')->nullable(); 
            $table->text('description')->nullable(); 
            $table->text('additional_info')->nullable(); 
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('passwords');
    }
}
