"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, count, isOpen, closeCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleCheckout() {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Checkout failed. Please try again.");
      }
    } catch {
      alert("Checkout failed. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "rgba(0,0,0,0.7)",
            }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100%",
              width: "100%",
              maxWidth: "420px",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              background: "var(--bg-elevated)",
              borderLeft: "1px solid rgba(215,43,43,0.2)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid rgba(245,245,245,0.08)",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "1.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  Your Cart
                  {count > 0 && (
                    <span
                      style={{
                        marginLeft: "10px",
                        background: "var(--primary)",
                        color: "#fff",
                        borderRadius: "999px",
                        fontSize: "0.7rem",
                        padding: "2px 8px",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        verticalAlign: "middle",
                      }}
                    >
                      {count}
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                style={{
                  color: "rgba(245,245,245,0.42)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  lineHeight: 0,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,245,0.42)")}
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items list */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {items.length === 0 ? (
                /* Empty state */
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "40px 0",
                  }}
                >
                  <svg
                    width="56"
                    height="56"
                    fill="none"
                    stroke="rgba(245,245,245,0.2)"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    style={{ marginBottom: "16px" }}
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <p
                    style={{
                      color: "rgba(245,245,245,0.42)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      margin: "0 0 16px",
                    }}
                  >
                    Your cart is empty
                  </p>
                  <button
                    onClick={closeCart}
                    style={{
                      background: "none",
                      border: "1px solid rgba(215,43,43,0.5)",
                      borderRadius: "6px",
                      color: "var(--primary)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "8px 20px",
                      cursor: "pointer",
                      transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--primary)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                      e.currentTarget.style.color = "var(--primary)";
                    }}
                  >
                    Keep Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      gap: "12px",
                      background: "var(--bg-card)",
                      borderRadius: "8px",
                      padding: "12px",
                      border: "1px solid rgba(245,245,245,0.06)",
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        background: "rgba(245,245,245,0.06)",
                        flexShrink: 0,
                        position: "relative",
                      }}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            stroke="rgba(245,245,245,0.25)"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Item info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          textTransform: "uppercase",
                          margin: "0 0 2px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name}
                      </p>
                      {(item.size || item.color) && (
                        <p
                          style={{
                            color: "rgba(245,245,245,0.42)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.72rem",
                            margin: "0 0 4px",
                          }}
                        >
                          {[item.color, item.size].filter(Boolean).join(" / ")}
                        </p>
                      )}
                      <p
                        style={{
                          color: "var(--primary)",
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: "1rem",
                          margin: 0,
                        }}
                      >
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Qty controls + remove */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        flexShrink: 0,
                      }}
                    >
                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "rgba(245,245,245,0.28)",
                          lineHeight: 0,
                          padding: 0,
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,245,0.28)")}
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Qty stepper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          background: "rgba(245,245,245,0.06)",
                          borderRadius: "999px",
                          padding: "4px 10px",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "rgba(245,245,245,0.6)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "1rem",
                            lineHeight: 1,
                            width: "16px",
                            height: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            transition: "color 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,245,0.6)")}
                        >
                          −
                        </button>
                        <span
                          style={{
                            color: "var(--text-primary)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.8rem",
                            width: "16px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "rgba(245,245,245,0.6)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "1rem",
                            lineHeight: 1,
                            width: "16px",
                            height: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            transition: "color 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,245,0.6)")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: "20px 24px",
                  borderTop: "1px solid rgba(245,245,245,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Subtotal */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(245,245,245,0.6)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "1.4rem",
                    }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  style={{
                    width: "100%",
                    background: "var(--primary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "14px 24px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    transition: "background 0.15s, transform 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#b51f1f")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary)")}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Checkout with Stripe
                </button>

                {/* Fine print */}
                <p
                  style={{
                    color: "rgba(245,245,245,0.28)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  Fulfilled by Printful · Ships via USPS
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
