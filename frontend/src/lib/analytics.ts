type EventName =
  | "page_view"
  | "click_whatsapp"
  | "click_program"
  | "click_masterclass"
  | "click_bootcamp"
  | "click_premium"
  | "click_pre_registration"
  | "form_started"
  | "form_step_completed"
  | "form_submitted"
  | "click_training";

export function trackEvent(eventName: EventName, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  // Google Analytics (gtag)
  if (typeof (window as unknown as { gtag?: Function }).gtag === "function") {
    (window as unknown as { gtag: Function }).gtag("event", eventName, params);
  }

  // Meta Pixel (fbq)
  if (typeof (window as unknown as { fbq?: Function }).fbq === "function") {
    (window as unknown as { fbq: Function }).fbq("trackCustom", eventName, params);
  }

  // Soft console log for development debugging
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] ${eventName}`, params);
  }
}
