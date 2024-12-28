<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswersTable extends Migration
{
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id('answer_id'); // 回答ID
            $table->unsignedBigInteger('user_id'); // ユーザーID (usersテーブルへの外部キー)
            $table->unsignedBigInteger('question_id');// 質問ID (survey_questionsテーブルへの外部キー)
            $table->text('answer'); // 回答内容
            $table->integer('response_value')->nullable(); // 回答に対するスコア
            $table->text('additional_notes')->nullable(); // 追加コメントやメモ
            $table->timestamps(); // created_at, updated_at
        
        $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        $table->foreign('question_id')->references('question_id')->on('questions')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('answers');
    }
}
