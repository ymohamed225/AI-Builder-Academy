<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pre_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_reference', 30)->unique();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('email', 150)->index();
            $table->string('phone', 30)->index();
            $table->string('profession', 100);
            $table->string('status_category', 100)->default('Entrepreneur');
            
            // Status Pipeline
            $table->enum('status', [
                'NEW',
                'CONTACTED',
                'QUALIFIED',
                'WAITING_CONFIRMATION',
                'CONFIRMED',
                'ENROLLED',
                'REJECTED',
                'CANCELLED'
            ])->default('NEW')->index();

            // Technical Levels Self-Evaluation
            $table->string('computer_level', 30)->default('débutant');
            $table->string('internet_level', 30)->default('intermédiaire');
            $table->string('excel_level', 30)->default('débutant');
            $table->string('ai_level', 30)->default('débutant');
            $table->string('programming_level', 30)->default('débutant');
            $table->string('database_level', 30)->default('débutant');
            $table->string('github_level', 30)->default('débutant');
            $table->string('nocode_level', 30)->default('débutant');

            // AI Experience
            $table->string('ai_usage_frequency', 50)->default('Occasionnellement');
            $table->json('ai_tools')->nullable();
            $table->string('ai_primary_use', 100)->nullable();

            // Project Details & App Types
            $table->string('has_project_idea', 30)->default('Oui');
            $table->text('project_description')->nullable();
            $table->text('problem_description')->nullable();
            $table->text('target_users')->nullable();
            $table->string('project_objective', 100)->nullable();
            $table->json('application_types')->nullable();

            // Training & Availability
            $table->string('desired_training', 50)->default('BOOTCAMP')->index();
            $table->string('weekly_availability', 50)->default('4 à 6 heures');
            $table->text('expected_result')->nullable();

            // Admin Notes
            $table->text('admin_notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pre_registrations');
    }
};
