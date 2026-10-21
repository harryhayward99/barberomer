// Keep the customer-approved Google destination intact. No tracking or interstitial.
const reviewDestination = "https://www.google.com/maps/place/Barber+Omer/@52.3536446,-1.5631723,17z/data=!4m8!3m7!1s0x4870caab03c73987:0x258060d7fc859613!8m2!3d52.3536446!4d-1.5605974!9m1!1b1!16s%2Fg%2F1hc0t7k2x?entry=ttu&g_ep=EgoyMDI2MTAxOC4wIKXMDSoASAFQAw%3D%3D";

export function GET() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: reviewDestination,
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
    },
  });
}
