<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SurveyController extends Controller
{
    // GET /api/admin/surveys
    public function index()
    {
        $surveys = Survey::withCount('responses')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $surveys
        ]);
    }

    // POST /api/admin/surveys
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fields' => 'required|array', // array of field definitions
            'is_active' => 'boolean',
        ]);

        $slug = Str::slug($validated['title']) . '-' . Str::random(5);

        $survey = Survey::create([
            'slug' => $slug,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'fields' => $validated['fields'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Formulaire d\'enquête créé avec succès.',
            'data' => $survey
        ], 201);
    }

    // GET /api/surveys/{id_or_slug}
    public function show($idOrSlug)
    {
        $survey = is_numeric($idOrSlug) 
            ? Survey::find($idOrSlug) 
            : Survey::where('slug', $idOrSlug)->first();

        if (!$survey) {
            return response()->json([
                'success' => false,
                'message' => 'Formulaire d\'enquête introuvable.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $survey
        ]);
    }

    // POST /api/surveys/{id_or_slug}/submit
    public function submit($idOrSlug, Request $request)
    {
        $survey = is_numeric($idOrSlug) 
            ? Survey::find($idOrSlug) 
            : Survey::where('slug', $idOrSlug)->first();

        if (!$survey) {
            return response()->json([
                'success' => false,
                'message' => 'Formulaire introuvable.'
            ], 404);
        }

        if (!$survey->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Ce formulaire d\'enquête n\'est plus actif.'
            ], 400);
        }

        $validated = $request->validate([
            'respondent_name' => 'nullable|string|max:255',
            'respondent_email' => 'nullable|email|max:255',
            'pre_registration_id' => 'nullable|exists:pre_registrations,id',
            'answers' => 'required|array',
        ]);

        $responseRecord = SurveyResponse::create([
            'survey_id' => $survey->id,
            'pre_registration_id' => $validated['pre_registration_id'] ?? null,
            'respondent_name' => $validated['respondent_name'] ?? 'Anonyme',
            'respondent_email' => $validated['respondent_email'] ?? null,
            'answers' => $validated['answers'],
        ]);

        $survey->increment('responses_count');

        return response()->json([
            'success' => true,
            'message' => 'Merci pour votre réponse !',
            'data' => $responseRecord
        ], 201);
    }

    // GET /api/admin/surveys/{id}/responses
    public function responses($id)
    {
        $survey = Survey::find($id);

        if (!$survey) {
            return response()->json([
                'success' => false,
                'message' => 'Enquête introuvable.'
            ], 404);
        }

        $responses = SurveyResponse::where('survey_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'survey' => $survey,
            'data' => $responses
        ]);
    }

    // DELETE /api/admin/surveys/{id}
    public function destroy($id)
    {
        $survey = Survey::find($id);
        if ($survey) {
            $survey->delete();
            return response()->json(['success' => true, 'message' => 'Formulaire supprimé.']);
        }
        return response()->json(['success' => false, 'message' => 'Introuvable.'], 404);
    }
}
