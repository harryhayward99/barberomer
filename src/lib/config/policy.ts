import { business } from "@/lib/config/business";

export const bookingPolicy = {
  heading: "Booking & cancellation policy",
  intro:
    "Omer values everyone who sits in his chair. This shop is also his living, so the time you book is time that matters.",
  sections: [
    {
      title: "Your appointment",
      body: "When you book, that time is held for you. Please arrive when you said you would. A missed appointment is an hour that cannot be given to someone else.",
    },
    {
      title: "Changing or cancelling",
      body: `If you cannot make it, call Omer on ${business.phoneDisplay} as soon as you know. The earlier he hears, the easier it is to offer that time to another customer.`,
    },
    {
      title: "Late cancellations and missed appointments",
      body: "A fee is not taken when you book. If an appointment is cancelled late or missed, a fee may be sent afterwards, once the circumstances have been considered.",
    },
  ],
};
