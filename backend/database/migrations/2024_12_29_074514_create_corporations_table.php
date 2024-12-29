<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCorporationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('corporations', function (Blueprint $table) {
            $table->string('corporation_id')->primary(); // 企業ユーザーID (主キー)
            $table->string('password'); // パスワード (必須)
            $table->string('name'); // 氏名
            $table->unsignedBigInteger('company_id'); // 会社ID (外部キー)
            $table->integer('age')->nullable(); // 年齢 (NULL 許可)
            $table->string('mail')->unique(); // メールアドレス (ユニーク制約)
            $table->unsignedBigInteger('role_id'); // 役割ID (外部キー)
            $table->timestamps(); // created_at と updated_at

            // 外部キー制約
            $table->foreign('company_id')->references('company_id')->on('companies')->onDelete('cascade');
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
        Schema::dropIfExists('corporations');
    }
}
