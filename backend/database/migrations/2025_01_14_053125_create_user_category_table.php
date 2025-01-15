<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_category', function (Blueprint $table) {
            $table->id(); // 主キー
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete(); // ユーザーID
            $table->foreignId('category_id')->constrained('categories', 'category_id')->cascadeOnDelete(); // カテゴリーID
            $table->integer('level')->comment('カテゴリーレベル (1~5)'); // レベル
            $table->timestamps(); // 作成日時と更新日時
            $table->unique(['user_id', 'category_id']); // ユニーク制約
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_category');
    }
};
