<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;
use Illuminate\Support\Facades\Log;

class ChariowWebhookController extends Controller
{
    /**
     * Traite les webhooks de confirmation de paiement Chariow.
     */
    public function handleWebhook(Request $request)
    {
        $payload = $request->all();
        
        Log::info('Webhook Chariow reçu:', $payload);

        // Clé de sécurité signature Chariow (configurable dans .env)
        $signature = $request->header('X-Chariow-Signature');
        $secret = config('services.chariow.webhook_secret', env('CHARIOW_WEBHOOK_SECRET'));

        if ($secret && $signature !== hash_hmac('sha256', json_encode($payload), $secret)) {
            Log::warning('Signature Webhook Chariow invalide.');
            return response()->json(['status' => 'unauthorized'], 401);
        }

        // Extraction des données de la transaction Chariow
        $transactionId = $payload['transaction_id'] ?? $payload['id'] ?? null;
        $customerEmail = $payload['customer_email'] ?? $payload['email'] ?? null;
        $customerPhone = $payload['customer_phone'] ?? $payload['phone'] ?? null;
        $customerName = $payload['customer_name'] ?? $payload['name'] ?? 'Élève AI Builder';
        $offerCode = $payload['product_code'] ?? $payload['offer'] ?? 'bootcamp';
        $amount = $payload['amount'] ?? 0;
        $status = $payload['status'] ?? 'completed';

        if (!$transactionId) {
            return response()->json(['status' => 'invalid_payload'], 400);
        }

        try {
            $registration = Registration::updateOrCreate(
                ['chariow_transaction_id' => $transactionId],
                [
                    'student_name' => $customerName,
                    'student_email' => $customerEmail,
                    'student_phone' => $customerPhone,
                    'offer_code' => strtolower($offerCode),
                    'amount_paid' => $amount,
                    'payment_status' => $status,
                    'paid_at' => now(),
                ]
            );

            // Trigger Onboarding (Mails / WhatsApp API if configured)
            Log::info("Inscription confirmée pour {$customerName} ({$offerCode}) via Chariow #{$transactionId}");

            return response()->json([
                'status' => 'success',
                'message' => 'Paiement Chariow enregistré et inscription validée.',
                'registration_id' => $registration->id
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur traitement webhook Chariow: ' . $e->getMessage());
            return response()->json(['status' => 'error'], 500);
        }
    }
}
