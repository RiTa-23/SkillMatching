<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('question_id'); // 質問ID (主キー)
            $table->unsignedBigInteger('category_id'); // カテゴリーID (外部キー)
            $table->unsignedBigInteger('language_id'); // 言語ID (外部キー)
            $table->text('question_text'); // 質問内容
            $table->timestamps(); // created_at, updated_at

            // 外部キー制約
            $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('cascade');
            $table->foreign('language_id')->references('language_id')->on('languages')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
