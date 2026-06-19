import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CartPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // stores the list of carts loaded from MySQL
  const [carts, setCarts] = useState([]);
  // stores the form input values for adding an item
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect: runs once when page loads
  // Fetches all carts for this user from Spring Boot
  useEffect(() => {
    api
      .get(`/cart/${user}`)
      .then((res) => setCarts(res.data))
      .catch(() => setError("Could not load carts. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [user]);

  // Creates a new empty cart for this user
  const createCart = async () => {
    try {
      const res = await api.post("/cart/create", { userName: user });
      setCarts([...carts, res.data]);
    } catch {
      setError("Failed to create cart.");
    }
  };

  // Adds an item to a specific cart
  const addItem = async (cartId) => {
    if (!itemName || !price) {
      setError("Please enter an item name and price.");
      return;
    }
    try {
      const res = await api.post(`/cart/${cartId}/item`, {
        itemName,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      // replace old cart with updated cart from server
      setCarts(carts.map((c) => (c.id === cartId ? res.data : c)));
      // clear the form fields
      setItemName("");
      setPrice("");
      setQuantity(1);
      setError("");
    } catch {
      setError("Failed to add item.");
    }
  };

  // Calculate total across ALL carts
  const grandTotal = carts
    .flatMap((c) => c.items)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading)
    return (
      <p style={{ padding: 24, fontFamily: "Arial" }}>Loading your carts...</p>
    );

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 24,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2>Welcome, {user}!</h2>
        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            background: "#eee",
            border: "1px solid #ccc",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Error message */}
      {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}

      {/* Create new cart button */}
      <button
        onClick={createCart}
        style={{
          marginBottom: 20,
          padding: "8px 20px",
          background: "#0F6E56",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        + New Cart
      </button>

      {/* No carts message */}
      {carts.length === 0 && (
        <p style={{ color: "#888" }}>
          No carts yet. Click + New Cart to start.
        </p>
      )}

      {/* Loop through each cart */}
      {carts.map((cart) => (
        <div
          key={cart.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <h3 style={{ marginBottom: 10 }}>Cart #{cart.id}</h3>

          {/* Items in this cart */}
          {cart.items.length === 0 ? (
            <p style={{ color: "#aaa", fontSize: 14 }}>No items yet.</p>
          ) : (
            <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
              {cart.items.map((item) => (
                <li key={item.id} style={{ marginBottom: 4 }}>
                  {item.itemName} × {item.quantity}
                  {" — "}${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          )}

          {/* Add item form */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              placeholder="Item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              style={{
                flex: 2,
                minWidth: 120,
                padding: "6px 8px",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                flex: 1,
                minWidth: 80,
                padding: "6px 8px",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
            <input
              type="number"
              placeholder="Qty"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
              style={{
                width: 60,
                padding: "6px 8px",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
            <button
              onClick={() => addItem(cart.id)}
              style={{
                padding: "6px 16px",
                background: "#1E4D8C",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
        </div>
      ))}

      {/* Checkout section — only shows when there are items */}
      {grandTotal > 0 && (
        <div style={{ textAlign: "right", marginTop: 24 }}>
          <p style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
            Grand Total: ${grandTotal.toFixed(2)}
          </p>
          <button
            onClick={() =>
              navigate("/checkout", { state: { total: grandTotal } })
            }
            style={{
              padding: "10px 28px",
              background: "#1E4D8C",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}
