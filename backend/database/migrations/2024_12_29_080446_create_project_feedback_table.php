<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectFeedbackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_feedback', function (Blueprint $table) {
            $table->bigIncrements('id'); // レコードID
            $table->unsignedBigInteger('project_id'); // 案件ID
            $table->unsignedBigInteger('user_id'); // 社員ID
            $table->unsignedBigInteger('role_id'); // 役割ID
            $table->text('feedback')->nullable(); // フィードバック
            $table->integer('rating')->nullable(); // 評価、スコア
            $table->timestamps(); // 作成日と更新日

            // 外部キー制約
            $table->foreign('project_id')->references('project_id')->on('projects')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('project_feedback');
    }
}
