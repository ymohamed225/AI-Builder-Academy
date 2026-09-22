<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_reference',
        'first_name',
        'last_name',
        'email',
        'phone',
        'profession',
        'status_category',
        'status',
        'computer_level',
        'internet_level',
        'excel_level',
        'ai_level',
        'programming_level',
        'database_level',
        'github_level',
        'nocode_level',
        'ai_usage_frequency',
        'ai_tools',
        'ai_primary_use',
        'has_project_idea',
        'project_description',
        'problem_description',
        'target_users',
        'project_objective',
        'application_types',
        'desired_training',
        'weekly_availability',
        'expected_result',
        'admin_notes',
    ];

    protected $casts = [
        'ai_tools' => 'array',
        'application_types' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Génère une référence unique de pré-inscription (ex: AI-CI-2026-X89K).
     */
    public static function generateReference(): string
    {
        $year = date('Y');
        $random = strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 5));
        return "AI-CI-{$year}-{$random}";
    }
}
