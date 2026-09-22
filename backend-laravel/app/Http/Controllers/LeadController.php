<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;
use Illuminate\Support\Facades\Log;

class LeadController extends Controller
{
    /**
     * Enregistre un prospect/clic CTA WhatsApp.
     */
    public function track(Request $request)
    {
        $validated = $request->validate([
            'offer_id' => 'required|string|max:50',
            'referrer' => 'nullable|string|max:255',
            'page_url' => 'nullable|string|max:255',
        ]);

        try {
            $lead = Lead::create([
                'offer_id' => $validated['offer_id'],
                'referrer' => $validated['referrer'] ?? 'direct',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'clicked_at' => now(),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Lead enregistré avec succès.',
                'lead_id' => $lead->id
            ], 201);
        } catch (\Exception $e) {
            Log::error('Erreur lors du suivi du lead: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Erreur serveur'], 500);
        }
    }

    /**
     * Retourne un résumé statistique des clics par offre.
     */
    public function summary()
    {
        $stats = Lead::selectRaw('offer_id, count(*) as total_clicks')
            ->groupBy('offer_id')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $stats
        ]);
    }
}
