<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'pre_registration_id',
        'respondent_name',
        'respondent_email',
        'answers',
    ];

    protected $casts = [
        'answers' => 'array',
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function candidate()
    {
        return $this->belongsTo(PreRegistration::class, 'pre_registration_id');
    }
}
