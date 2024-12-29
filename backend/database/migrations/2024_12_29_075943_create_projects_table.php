<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('project_id'); // 案件ID (PK)
            $table->string('title'); // 案件名
            $table->unsignedBigInteger('company_id'); // 案件元の会社ID (FK)
            $table->text('contents')->nullable(); // 案件詳細 (NULLを許可)
            $table->date('start_date'); // 開始日
            $table->date('end_date')->nullable(); // 終了日 (NULLを許可)
            $table->string('status')->default('進行中'); // 状態 (デフォルト値: "進行中")
            $table->timestamps(); // created_at と updated_at を自動生成

            // 外部キー制約
            $table->foreign('company_id')->references('company_id')->on('companies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
