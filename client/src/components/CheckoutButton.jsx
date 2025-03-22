import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createCheckoutSession } from "../store/checkoutSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton() {
  const dispatch = useDispatch();
  const { sessionId, status} = useSelector((state) => state.checkout);

  useEffect(() => {
    const redirectToCheckout = async () => {
      if (sessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) console.error("Stripe error:", error);
      }
    };
    redirectToCheckout();
  }, [sessionId]);

  const handleCheckout = () => {
    dispatch(createCheckoutSession());
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button onClick={handleCheckout} disabled={status === "loading"} style={{ backgroundColor: "green", color: "white", padding: "10px", fontSize: "16px" }}>
        {status === "loading" ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
