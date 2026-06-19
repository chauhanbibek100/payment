import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CheckoutPage() {
  // useLocation reads the total passed from CartPage via navigate()
  const { state } = useLocation();
  const navigate = useNavigate();

  const [gateway, setGateway] = useState("PAYPAL");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  // Called when user clicks Pay button
  const handlePay = async () => {
    setProcessing(true);
    setMessage("");
    try {
      const res = await api.post("/payment", {
        gateway,
        amount: state.total,
        description: "Cart checkout via React",
      });
      // res.data = "Payment processed via PAYPAL"
      setMessage(res.data);
    } catch {
      setMessage("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // Guard: if user lands here without a total, send back to cart
  if (!state?.total) {
    return (
      <div style={{ padding: 24, fontFamily: "Arial" }}>
        <p>No cart total found.</p>
        <button onClick={() => navigate("/cart")}>← Back to Cart</button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "80px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 8,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Checkout</h2>

      {/* Order total */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "12px 16px",
          borderRadius: 6,
          marginBottom: 20,
        }}
      >
        <p style={{ fontSize: 18, fontWeight: "bold" }}>
          Total: ${state.total.toFixed(2)}
        </p>
      </div>

      {/* Gateway selector */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", marginBottom: 6 }}>
          Choose payment gateway:
        </label>
        <select
          value={gateway}
          onChange={(e) => setGateway(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            border: "1px solid #ccc",
            borderRadius: 4,
            fontSize: 14,
            background: "white",
          }}
        >
          <option value="PAYPAL">PayPal</option>
          <option value="STRIPE">Stripe</option>
          <option value="SQUARE">Square</option>
        </select>
      </div>

      {/* Success or error message */}
      {message && (
        <p
          style={{
            color: message.toLowerCase().includes("failed") ? "red" : "green",
            marginBottom: 16,
            padding: "8px 12px",
            background: message.toLowerCase().includes("failed")
              ? "#fff0f0"
              : "#f0fff4",
            borderRadius: 4,
          }}
        >
          {message}
        </p>
      )}

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={processing}
        style={{
          width: "100%",
          padding: 12,
          background: processing ? "#aaa" : "#1E4D8C",
          color: "white",
          border: "none",
          borderRadius: 4,
          fontSize: 16,
          cursor: processing ? "not-allowed" : "pointer",
          marginBottom: 10,
        }}
      >
        {processing ? "Processing..." : `Pay with ${gateway}`}
      </button>

      {/* Back to cart */}
      <button
        onClick={() => navigate("/cart")}
        style={{
          width: "100%",
          padding: 10,
          background: "transparent",
          border: "1px solid #ddd",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 14,
          color: "#555",
        }}
      >
        ← Back to Cart
      </button>
    </div>
  );
}
