<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); // 主キー
            $table->string('password'); // パスワード
            $table->string('name'); // 氏名
            $table->integer('age')->nullable(); // 年齢 (NULL許可)
            $table->string('email')->unique(); // メールアドレス (ユニーク制約)
            $table->unsignedBigInteger('role_id'); // 役割ID (外部キー)
            $table->timestamps(); // created_at と updated_at を自動生成

            // 外部キー制約
            $table->foreign('role_id')->references('role_id')->on('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
