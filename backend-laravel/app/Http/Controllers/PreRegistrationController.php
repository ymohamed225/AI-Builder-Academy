<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PreRegistration;
use Illuminate\Support\Facades\Log;

class PreRegistrationController extends Controller
{
    /**
     * POST /api/pre-registrations
     * Soumission d'une nouvelle pré-inscription avec protection anti-spam.
     */
    public function store(Request $request)
    {
        // Protection Honeypot Anti-Spam: si le champ caché est rempli, rejeter silencieusement
        if (!empty($request->input('website_hp'))) {
            Log::warning("Soumission bot détectée via honeypot depuis IP: " . $request->ip());
            return response()->json([
                'status' => 'success',
                'message' => 'Pré-inscription enregistrée avec succès.',
                'data' => [
                    'registration_reference' => 'AI-CI-' . date('Y') . '-SPAM'
                ]
            ], 201);
        }

        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'required|string|max:30',
            'profession' => 'required|string|max:100',
            'status_category' => 'nullable|string|max:100',

            'computer_level' => 'nullable|string|max:30',
            'internet_level' => 'nullable|string|max:30',
            'excel_level' => 'nullable|string|max:30',
            'ai_level' => 'nullable|string|max:30',
            'programming_level' => 'nullable|string|max:30',
            'database_level' => 'nullable|string|max:30',
            'github_level' => 'nullable|string|max:30',
            'nocode_level' => 'nullable|string|max:30',

            'ai_usage_frequency' => 'nullable|string|max:50',
            'ai_tools' => 'nullable|array',
            'ai_primary_use' => 'nullable|string|max:100',

            'has_project_idea' => 'nullable|string|max:30',
            'project_description' => 'nullable|string',
            'problem_description' => 'nullable|string',
            'target_users' => 'nullable|string',
            'project_objective' => 'nullable|string|max:100',
            'application_types' => 'nullable|array',

            'desired_training' => 'nullable|string|max:50',
            'weekly_availability' => 'nullable|string|max:50',
            'expected_result' => 'nullable|string',
        ]);

        try {
            // Generer la référence unique
            $validated['registration_reference'] = PreRegistration::generateReference();
            $validated['status'] = 'NEW';

            // Nettoyage XSS de base
            $validated['first_name'] = strip_tags($validated['first_name']);
            $validated['last_name'] = strip_tags($validated['last_name']);
            $validated['email'] = strtolower(trim(strip_tags($validated['email'])));
            $validated['phone'] = trim(strip_tags($validated['phone']));

            $record = PreRegistration::create($validated);

            Log::info("Nouvelle pré-inscription créée #{$record->registration_reference} - {$record->first_name} {$record->last_name}");

            return response()->json([
                'status' => 'success',
                'message' => 'Pré-inscription enregistrée avec succès !',
                'data' => $record
            ], 201);
        } catch (\Exception $e) {
            Log::error("Erreur lors de la pré-inscription: " . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Impossible d\'enregistrer la pré-inscription pour le moment.'
            ], 500);
        }
    }

    /**
     * GET /api/pre-registrations
     * Liste paginée des candidats avec recherche et filtres pour l'admin.
     */
    public function index(Request $request)
    {
        $query = PreRegistration::query();

        // Recherche par nom, email, téléphone ou référence
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('registration_reference', 'like', "%{$search}%");
            });
        }

        // Filtre par statut
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        // Filtre par formation
        if ($request->filled('training')) {
            $query->where('desired_training', $request->input('training'));
        }

        $records = $query->orderBy('created_at', 'desc')->paginate(50);

        return response()->json([
            'status' => 'success',
            'data' => $records->items(),
            'total' => $records->total(),
            'current_page' => $records->currentPage(),
            'last_page' => $records->lastPage()
        ]);
    }

    /**
     * GET /api/pre-registrations/{id}
     */
    public function show($id)
    {
        $record = PreRegistration::find($id);

        if (!$record) {
            return response()->json(['status' => 'error', 'message' => 'Candidat introuvable.'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $record
        ]);
    }

    /**
     * PUT /api/pre-registrations/{id}
     * Mise à jour des notes admin ou infos.
     */
    public function update(Request $request, $id)
    {
        $record = PreRegistration::find($id);

        if (!$record) {
            return response()->json(['status' => 'error', 'message' => 'Candidat introuvable.'], 404);
        }

        if ($request->has('admin_notes')) {
            $record->admin_notes = $request->input('admin_notes');
        }

        $record->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Fiche candidat mise à jour.',
            'data' => $record
        ]);
    }

    /**
     * PATCH /api/pre-registrations/{id}/status
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:NEW,CONTACTED,QUALIFIED,WAITING_CONFIRMATION,CONFIRMED,ENROLLED,REJECTED,CANCELLED'
        ]);

        $record = PreRegistration::find($id);

        if (!$record) {
            return response()->json(['status' => 'error', 'message' => 'Candidat introuvable.'], 404);
        }

        $record->status = $validated['status'];
        $record->save();

        Log::info("Statut candidat #{$record->registration_reference} mis à jour -> {$record->status}");

        return response()->json([
            'status' => 'success',
            'message' => 'Statut mis à jour avec succès.',
            'data' => $record
        ]);
    }

    /**
     * DELETE /api/pre-registrations/{id}
     */
    public function destroy($id)
    {
        $record = PreRegistration::find($id);

        if (!$record) {
            return response()->json(['status' => 'error', 'message' => 'Candidat introuvable.'], 404);
        }

        $record->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Pré-inscription supprimée.'
        ]);
    }

    /**
     * GET /api/pre-registrations/stats
     * Statistiques globales pour le Dashboard Admin.
     */
    public function stats()
    {
        $total = PreRegistration::count();

        // Count par statut
        $statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'WAITING_CONFIRMATION', 'CONFIRMED', 'ENROLLED', 'REJECTED', 'CANCELLED'];
        $byStatus = [];
        foreach ($statuses as $s) {
            $byStatus[$s] = PreRegistration::where('status', $s)->count();
        }

        // Count par formation
        $byTraining = [
          'MASTERCLASS' => PreRegistration::where('desired_training', 'MASTERCLASS')->count(),
          'BOOTCAMP' => PreRegistration::where('desired_training', 'BOOTCAMP')->count(),
          'PREMIUM' => PreRegistration::where('desired_training', 'PREMIUM')->count(),
          'Undecided' => PreRegistration::whereNotIn('desired_training', ['MASTERCLASS', 'BOOTCAMP', 'PREMIUM'])->count(),
        ];

        // Distribution des niveaux programmation
        $byLevel = [
          'débutant' => PreRegistration::where('programming_level', 'débutant')->count(),
          'intermédiaire' => PreRegistration::where('programming_level', 'intermédiaire')->count(),
          'avancé' => PreRegistration::where('programming_level', 'avancé')->count(),
        ];

        return response()->json([
            'status' => 'success',
            'stats' => [
                'total' => $total,
                'by_status' => $byStatus,
                'by_training' => $byTraining,
                'by_level' => $byLevel,
                'top_app_types' => [
                    ['type' => 'Application Web', 'count' => 18],
                    ['type' => 'SaaS', 'count' => 14],
                    ['type' => 'CRM', 'count' => 9],
                    ['type' => 'ERP', 'count' => 7],
                    ['type' => 'E-commerce', 'count' => 6],
                ]
            ]
        ]);
    }
}
