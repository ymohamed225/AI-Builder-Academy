<?php

namespace App\Http\Controllers;

use App\Models\MessageCampaign;
use App\Models\PreRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MessageCampaignController extends Controller
{
    // GET /api/admin/campaigns
    public function index()
    {
        $campaigns = MessageCampaign::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $campaigns
        ]);
    }

    // POST /api/admin/campaigns/send
    public function send(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'channel' => 'required|in:WHATSAPP,EMAIL,BOTH',
            'recipient_type' => 'required|in:ALL,STATUS,TRAINING,CUSTOM',
            'status_filter' => 'nullable|string',
            'training_filter' => 'nullable|string',
            'candidate_ids' => 'nullable|array',
            'subject' => 'nullable|string|max:255',
            'body_template' => 'required|string',
            'attachment_url' => 'nullable|string',
            'attachment_name' => 'nullable|string',
            'is_scheduled' => 'nullable|boolean',
            'scheduled_at' => 'nullable|date',
        ]);

        // Build Query for targeted candidates
        $query = PreRegistration::query();

        if ($validated['recipient_type'] === 'STATUS' && !empty($validated['status_filter'])) {
            $query->where('status', $validated['status_filter']);
        } elseif ($validated['recipient_type'] === 'TRAINING' && !empty($validated['training_filter'])) {
            $query->where('desired_training', $validated['training_filter']);
        } elseif ($validated['recipient_type'] === 'CUSTOM' && !empty($validated['candidate_ids'])) {
            $query->whereIn('id', $validated['candidate_ids']);
        }

        $recipients = $query->get();
        $sentCount = $recipients->count();

        // Create Campaign Record
        $campaign = MessageCampaign::create([
            'title' => $validated['title'],
            'channel' => $validated['channel'],
            'recipient_type' => $validated['recipient_type'],
            'recipient_filters' => [
                'status' => $validated['status_filter'] ?? null,
                'training' => $validated['training_filter'] ?? null,
                'candidate_ids' => $validated['candidate_ids'] ?? [],
            ],
            'subject' => $validated['subject'] ?? null,
            'body_template' => $validated['body_template'],
            'attachment_url' => $validated['attachment_url'] ?? null,
            'attachment_name' => $validated['attachment_name'] ?? null,
            'is_scheduled' => $validated['is_scheduled'] ?? false,
            'scheduled_at' => $validated['scheduled_at'] ?? null,
            'status' => ($validated['is_scheduled'] ?? false) ? 'SCHEDULED' : 'SENT',
            'sent_count' => $sentCount,
        ]);

        // Generate personalized WhatsApp links & email items for recipients
        $processedRecipients = $recipients->map(function ($candidate) use ($validated) {
            $firstName = $candidate->first_name ?? 'Candidat';
            $ref = $candidate->registration_reference ?? '';
            $training = $candidate->desired_training ?? '';

            // Replace template placeholders like {first_name}, {ref}, {training}
            $personalizedBody = str_replace(
                ['{first_name}', '{last_name}', '{ref}', '{training}'],
                [$firstName, $candidate->last_name ?? '', $ref, $training],
                $validated['body_template']
            );

            // Sanitize phone for WhatsApp
            $cleanPhone = preg_replace('/[^0-9]/', '', $candidate->phone ?? '');
            if (strlen($cleanPhone) === 10 && !str_starts_with($cleanPhone, '225')) {
                $cleanPhone = '225' . $cleanPhone;
            }

            $waMessage = urlencode($personalizedBody);
            if (!empty($validated['attachment_url'])) {
                $waMessage .= urlencode("\n\n📄 Document joint : " . $validated['attachment_url']);
            }

            $whatsappLink = "https://wa.me/{$cleanPhone}?text={$waMessage}";

            return [
                'id' => $candidate->id,
                'name' => $candidate->first_name . ' ' . $candidate->last_name,
                'email' => $candidate->email,
                'phone' => $candidate->phone,
                'clean_phone' => $cleanPhone,
                'whatsapp_link' => $whatsappLink,
                'personalized_body' => $personalizedBody,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => "Campagne créée. {$sentCount} destinataire(s) ciblés.",
            'campaign' => $campaign,
            'recipients' => $processedRecipients
        ], 201);
    }

    // POST /api/admin/campaigns/upload-attachment
    public function uploadAttachment(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:10240', // max 10MB
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $file->getClientOriginalName());
            
            // Move file to public/attachments directory
            $publicPath = public_path('attachments');
            if (!file_exists($publicPath)) {
                mkdir($publicPath, 0755, true);
            }
            $file->move($publicPath, $fileName);

            $fileUrl = url('attachments/' . $fileName);

            return response()->json([
                'success' => true,
                'file_name' => $file->getClientOriginalName(),
                'file_url' => $fileUrl
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Aucun fichier reçu.'], 400);
    }
}
