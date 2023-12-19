export function createStripeClient() {
  // @ts-ignore - Disables TypeScript checking for the next line
  return new Stripe(env.STRIPE_API_KEY, { apiVersion: "2023-10-16", httpClient: Stripe.createFetchHttpClient() });
}
