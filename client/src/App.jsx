import React from "react";
import CheckoutButton from "./components/CheckoutButton";

function App() {
  return (
    <div>
      <h1 style={{ color: "white", backgroundColor: "red", textAlign: "center" }}>Stripe Payment Integration</h1>
      <CheckoutButton />
    </div>
  );
}

export default App;
