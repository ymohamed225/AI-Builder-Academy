<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('message_campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('channel', ['WHATSAPP', 'EMAIL', 'BOTH'])->default('WHATSAPP');
            $table->enum('recipient_type', ['ALL', 'STATUS', 'TRAINING', 'CUSTOM'])->default('ALL');
            $table->json('recipient_filters')->nullable();
            $table->string('subject')->nullable();
            $table->text('body_template');
            $table->string('attachment_url')->nullable();
            $table->string('attachment_name')->nullable();
            $table->boolean('is_scheduled')->default(false);
            $table->timestamp('scheduled_at')->nullable();
            $table->enum('status', ['DRAFT', 'SCHEDULED', 'SENT', 'FAILED'])->default('DRAFT');
            $table->integer('sent_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('message_campaigns');
    }
};
