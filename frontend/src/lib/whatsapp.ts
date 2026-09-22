import { SITE_CONFIG } from "@/config/site";

export function getWhatsAppLink(customMessage?: string): string {
  const number = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  const message = customMessage || SITE_CONFIG.whatsappMessages.hero;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

export function openWhatsApp(customMessage?: string, offerId?: string): void {
  const url = getWhatsAppLink(customMessage);
  
  // Envoi asynchrone du lead au backend Laravel si disponible
  if (typeof window !== "undefined") {
    try {
      fetch(`${SITE_CONFIG.apiUrl}/leads/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer_id: offerId || "general",
          referrer: document.referrer || "direct",
          page_url: window.location.href,
        }),
      }).catch(() => {
        // En cas d'erreur API silent fallback
      });
    } catch {
      // Ignore network errors
    }
  }

  window.open(url, "_blank", "noopener,noreferrer");
}
