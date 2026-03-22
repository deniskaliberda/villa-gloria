// Stripe webhook disabled — booking system uses inquiry-based flow
// (no online payments, payment via bank transfer or cash)
export async function POST() {
  return new Response("Webhook disabled", { status: 410 });
}
