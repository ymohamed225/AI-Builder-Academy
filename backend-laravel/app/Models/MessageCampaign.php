<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageCampaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'channel',
        'recipient_type',
        'recipient_filters',
        'subject',
        'body_template',
        'attachment_url',
        'attachment_name',
        'is_scheduled',
        'scheduled_at',
        'status',
        'sent_count',
    ];

    protected $casts = [
        'recipient_filters' => 'array',
        'is_scheduled' => 'boolean',
        'scheduled_at' => 'datetime',
        'sent_count' => 'integer',
    ];
}
