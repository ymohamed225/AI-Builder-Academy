<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->json('fields'); // array of questions, field_type, choices, is_required
            $table->boolean('is_active')->default(true);
            $table->integer('responses_count')->default(0);
            $table->timestamps();
        });

        Schema::create('survey_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained('surveys')->onDelete('cascade');
            $table->foreignId('pre_registration_id')->nullable()->constrained('pre_registrations')->onDelete('set null');
            $table->string('respondent_name')->nullable();
            $table->string('respondent_email')->nullable();
            $table->json('answers'); // key-value map of field_id => response
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survey_responses');
        Schema::dropIfExists('surveys');
    }
};
