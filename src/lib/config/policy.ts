import { business } from "@/lib/config/business";

export const bookingPolicy = {
  heading: "Booking & cancellation policy",
  intro:
    "Omer values everyone who sits in his chair. This shop is also his living, so the time you book is time that matters.",
  sections: [
    {
      title: "Your appointment",
      body: "When you book, that time is held for you. Please arrive when you said you would. A missed appointment is time that cannot be given to someone else.",
    },
    {
      title: "Changing or cancelling",
      body: `Use the reschedule or cancellation link in your confirmation text. Opening the link alone does not change your booking: complete the steps on the page to confirm. Links close 2 hours before your appointment. If you cannot find your link or need a later change, call ${business.phoneDisplay}. Your appointment stays unchanged until a change is confirmed.`,
    },
    {
      title: "Late cancellations and missed appointments",
      body: "A fee is not taken when you book. If an appointment is cancelled late or missed, a fee may be sent afterwards, once the circumstances have been considered.",
    },
  ],
};
