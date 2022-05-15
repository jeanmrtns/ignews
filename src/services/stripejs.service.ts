import { loadStripe } from "@stripe/stripe-js";

export async function getStripe() {
    const stripeJS = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

    return stripeJS;
}