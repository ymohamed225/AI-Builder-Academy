<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'fields',
        'is_active',
        'responses_count',
    ];

    protected $casts = [
        'fields' => 'array',
        'is_active' => 'boolean',
        'responses_count' => 'integer',
    ];

    public function responses()
    {
        return $this->hasMany(SurveyResponse::class);
    }
}
