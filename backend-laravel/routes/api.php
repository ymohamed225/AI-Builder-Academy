<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\PreRegistrationController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\MessageCampaignController;

/*
|--------------------------------------------------------------------------
| API Routes - AI Builder Academy CI Backend V1
|--------------------------------------------------------------------------
*/

// Endpoint de santé & status
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'academy' => 'AI Builder Academy CI',
        'version' => '1.0.0',
        'timestamp' => now()->toIso8601String()
    ]);
});

// Traçabilité des clics CTA
Route::post('/leads/track', [LeadController::class, 'track']);

// Pré-inscriptions Candidats (Public POST, Admin GET/PUT/PATCH/DELETE)
Route::post('/pre-registrations', [PreRegistrationController::class, 'store']);
Route::get('/pre-registrations', [PreRegistrationController::class, 'index']);
Route::get('/pre-registrations/stats', [PreRegistrationController::class, 'stats']);
Route::get('/pre-registrations/{id}', [PreRegistrationController::class, 'show']);
Route::put('/pre-registrations/{id}', [PreRegistrationController::class, 'update']);
Route::patch('/pre-registrations/{id}/status', [PreRegistrationController::class, 'updateStatus']);
Route::delete('/pre-registrations/{id}', [PreRegistrationController::class, 'destroy']);

// Enquêtes / Formulaires (Mini Google Forms - Admin & Public)
Route::get('/admin/surveys', [SurveyController::class, 'index']);
Route::post('/admin/surveys', [SurveyController::class, 'store']);
Route::delete('/admin/surveys/{id}', [SurveyController::class, 'destroy']);
Route::get('/admin/surveys/{id}/responses', [SurveyController::class, 'responses']);

Route::get('/surveys/{id_or_slug}', [SurveyController::class, 'show']);
Route::post('/surveys/{id_or_slug}/submit', [SurveyController::class, 'submit']);

// Messagerie, WhatsApp, Email & Pièces jointes (Admin)
Route::get('/admin/campaigns', [MessageCampaignController::class, 'index']);
Route::post('/admin/campaigns/send', [MessageCampaignController::class, 'send']);
Route::post('/admin/campaigns/upload-attachment', [MessageCampaignController::class, 'uploadAttachment']);

