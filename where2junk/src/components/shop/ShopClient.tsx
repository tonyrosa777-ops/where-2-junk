"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import seededProducts from "@/lib/printful-seeded-products.json";

const CATEGORIES = ["All", "Apparel", "Headwear", "Drinkware", "Bags"];

interface PrintfulProduct {
  id: number;
  name: string;
  thumbnail_url?: string;
  variants?: number;
  sync_product?: { name: string; thumbnail_url?: string };
}

interface NormalizedProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

interface VariantOption {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
}

type PickerStatus = "idle" | "loading" | "ready" | "error";

interface VariantPickerState {
  status: PickerStatus;
  variants: VariantOption[];
  selectedSize: string;
  selectedColor: string;
  expanded: boolean;
}

// ── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(215,43,43,0.15)",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          aspectRatio: "1/1",
          background: "rgba(245,245,245,0.04)",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ height: "8px", background: "rgba(245,245,245,0.06)", borderRadius: "4px", width: "40%" }} />
        <div style={{ height: "12px", background: "rgba(245,245,245,0.06)", borderRadius: "4px", width: "75%" }} />
        <div style={{ height: "20px", background: "rgba(245,245,245,0.06)", borderRadius: "4px", width: "30%", marginTop: "8px" }} />
      </div>
    </div>
  );
}

// ── Placeholder truck SVG ────────────────────────────────────────────────────

function TruckPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(215,43,43,0.05)",
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(215,43,43,0.3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function ShopClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<number | string | null>(null);
  const [pickerStates, setPickerStates] = useState<Record<number, VariantPickerState>>({});
  const { addItem } = useCart();

  // ── Load products ──────────────────────────────────────────────────────────

  useEffect(() => {
    const previewMap: Record<number, string> = {};
    (seededProducts as { products: Array<{ printful_id: number; preview_image_url?: string }> }).products.forEach((p) => {
      if (p.preview_image_url) previewMap[p.printful_id] = p.preview_image_url;
    });

    fetch("/api/printful/products")
      .then((r) => r.json())
      .then((data: PrintfulProduct[]) => {
        if (!Array.isArray(data) || data.length === 0) throw new Error("empty");
        const normalized: NormalizedProduct[] = data.map((p) => {
          const raw = p.sync_product ?? p;
          const name = raw.name ?? p.name ?? "Product";
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

          let category = "Apparel";
          const lower = name.toLowerCase();
          if (/mug|tumbler|water bottle|enamel|can cooler/.test(lower)) category = "Drinkware";
          else if (/tote|drawstring|crossbody|duffle|backpack|laptop sleeve/.test(lower)) category = "Bags";
          else if (/beanie|bucket hat|hat|snapback|cap/.test(lower)) category = "Headwear";

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const productId: number = p.id ?? (p as any).printful_id;
          const pfThumb = raw.thumbnail_url || p.thumbnail_url;
          const image = pfThumb && pfThumb.length > 10 ? pfThumb : previewMap[productId];

          return { id: productId, slug, name, price: 0, category, image };
        });
        setProducts(normalized);
      })
      .catch(() => {
        const seeded = seededProducts as {
          products: Array<{
            slug: string;
            name: string;
            price: number;
            category: string;
            preview_image_url?: string;
            printful_id: number;
          }>;
        };
        setProducts(
          seeded.products.map((p) => ({
            id: p.printful_id,
            slug: p.slug,
            name: p.name,
            price: p.price,
            category: p.category,
            image: p.preview_image_url,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Seeded price fallback ──────────────────────────────────────────────────

  const seededPrices: Record<number, number> = {};
  (seededProducts as { products: Array<{ printful_id: number; price: number }> }).products.forEach((p) => {
    seededPrices[p.printful_id] = p.price;
  });

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // ── Picker helpers ─────────────────────────────────────────────────────────

  function getPicker(productId: number): VariantPickerState {
    return pickerStates[productId] ?? {
      status: "idle",
      variants: [],
      selectedSize: "",
      selectedColor: "",
      expanded: false,
    };
  }

  function setPicker(productId: number, patch: Partial<VariantPickerState>) {
    setPickerStates((prev) => ({
      ...prev,
      [productId]: { ...getPicker(productId), ...patch },
    }));
  }

  async function openVariantPicker(product: NormalizedProduct) {
    const picker = getPicker(product.id);
    if (picker.expanded) {
      setPicker(product.id, { expanded: false });
      return;
    }
    if (picker.status === "ready") {
      setPicker(product.id, { expanded: true });
      return;
    }
    setPicker(product.id, { status: "loading", expanded: true });
    try {
      const res = await fetch(`/api/printful/variants/${product.id}`);
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const variants: VariantOption[] = data.variants ?? [];
      if (variants.length === 1) {
        setPicker(product.id, {
          status: "ready",
          variants,
          selectedSize: variants[0].size,
          selectedColor: variants[0].color,
          expanded: true,
        });
      } else {
        setPicker(product.id, { status: "ready", variants, expanded: true });
      }
    } catch {
      setPicker(product.id, { status: "error" });
    }
  }

  function handleAddPODItem(product: NormalizedProduct) {
    const picker = getPicker(product.id);
    const variant = getSelectedVariant(product.id);
    if (!variant) return;

    const displayName = [
      product.name,
      picker.selectedSize ? picker.selectedSize : undefined,
    ]
      .filter(Boolean)
      .join(" — ");

    addItem({
      id: variant.id,
      name: displayName,
      price: variant.price,
      quantity: 1,
      image: variant.image || product.image,
      printful_variant_id: variant.id,
      size: variant.size,
      color: variant.color,
    });

    setAddedId(variant.id);
    setTimeout(() => setAddedId(null), 1500);
    setPicker(product.id, { expanded: false });
  }

  function getSelectedVariant(productId: number): VariantOption | undefined {
    const picker = getPicker(productId);
    if (picker.status !== "ready" || picker.variants.length === 0) return undefined;
    return picker.variants.find(
      (v) => !picker.selectedSize || v.size === picker.selectedSize
    );
  }

  function getUniqueSizes(productId: number): string[] {
    const picker = getPicker(productId);
    return [...new Set(picker.variants.map((v) => v.size))].filter(Boolean);
  }

  function isSizeAvailable(productId: number, size: string): boolean {
    const picker = getPicker(productId);
    return picker.variants.some((v) => v.size === size);
  }

  function getDisplayPrice(product: NormalizedProduct): number {
    const variant = getSelectedVariant(product.id);
    if (variant) return variant.price;
    const picker = getPicker(product.id);
    if (picker.status === "ready" && picker.variants.length > 0) {
      return picker.variants[0].price;
    }
    return seededPrices[product.id] ?? product.price;
  }

  const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "2XL", "3XL", "4XL", "5XL", "6XL"];
  function sortSizes(sizes: string[]): string[] {
    return [...sizes].sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a);
      const bi = SIZE_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "var(--bg-base)",
          padding: "120px 24px 64px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle red glow backdrop */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse at center, rgba(215,43,43,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--primary)",
              margin: "0 0 16px",
            }}
          >
            WHERE2JUNK MERCH
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 0.9,
              color: "var(--text-primary)",
              margin: "0 0 20px",
              letterSpacing: "-0.01em",
            }}
          >
            Gear Up.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              color: "rgba(245,245,245,0.72)",
              margin: 0,
            }}
          >
            Represent Manchester&apos;s hauler.
          </motion.p>
        </div>
      </section>

      {/* Category filter pills */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "var(--bg-elevated)",
          borderBottom: "1px solid rgba(245,245,245,0.06)",
          padding: "12px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "2px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "7px 18px",
                borderRadius: "999px",
                fontSize: "0.78rem",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                cursor: "pointer",
                border: activeCategory === cat ? "1px solid var(--primary)" : "1px solid rgba(215,43,43,0.3)",
                background: activeCategory === cat ? "var(--primary)" : "transparent",
                color: activeCategory === cat ? "#fff" : "rgba(245,245,245,0.72)",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <Suspense fallback={null}>
        <section
          style={{
            background: "var(--bg-base)",
            padding: "48px 24px 80px",
          }}
        >
          <div
            style={{
              maxWidth: "1152px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : filteredProducts.map((product, i) => {
                  const picker = getPicker(product.id);
                  const displayPrice = getDisplayPrice(product);
                  const selectedVariant = getSelectedVariant(product.id);
                  const uniqueSizes = sortSizes(getUniqueSizes(product.id));
                  const hasSizes = uniqueSizes.length > 0;
                  const isAdded = addedId === selectedVariant?.id;
                  const canAdd = picker.status === "ready" && selectedVariant !== undefined;

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                      layout
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid rgba(215,43,43,0.25)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "border-color 0.2s, transform 0.2s",
                        cursor: "default",
                      }}
                      whileHover={{ y: -2 }}
                    >
                      {/* Product image */}
                      <div
                        style={{
                          aspectRatio: "1/1",
                          position: "relative",
                          overflow: "hidden",
                          background: "rgba(245,245,245,0.03)",
                          flexShrink: 0,
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={product.image ?? "placeholder"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{
                              position: "absolute",
                              inset: 0,
                            }}
                          >
                            {product.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                                loading="lazy"
                              />
                            ) : (
                              <TruckPlaceholder />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Card body */}
                      <div
                        style={{
                          padding: "14px 16px 16px",
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Category label */}
                        <p
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.65rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            color: "var(--primary)",
                            margin: "0 0 4px",
                          }}
                        >
                          {product.category}
                        </p>

                        {/* Product name */}
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            fontSize: "0.85rem",
                            color: "var(--text-primary)",
                            lineHeight: 1.25,
                            margin: "0 0 8px",
                          }}
                        >
                          {product.name}
                        </h3>

                        {/* Inline variant picker */}
                        <AnimatePresence>
                          {picker.expanded && picker.status === "ready" && hasSizes && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeInOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              <div style={{ paddingBottom: "10px" }}>
                                <p
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.62rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.12em",
                                    color: "rgba(245,245,245,0.42)",
                                    margin: "0 0 6px",
                                  }}
                                >
                                  Size
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                  {uniqueSizes.map((size) => {
                                    const available = isSizeAvailable(product.id, size);
                                    const selected = picker.selectedSize === size;
                                    return (
                                      <button
                                        key={size}
                                        disabled={!available}
                                        onClick={() => setPicker(product.id, { selectedSize: size })}
                                        style={{
                                          padding: "4px 10px",
                                          borderRadius: "4px",
                                          fontSize: "0.72rem",
                                          fontFamily: "var(--font-mono)",
                                          fontWeight: 700,
                                          cursor: available ? "pointer" : "not-allowed",
                                          border: selected
                                            ? "1px solid var(--primary)"
                                            : available
                                            ? "1px solid rgba(215,43,43,0.4)"
                                            : "1px solid rgba(245,245,245,0.1)",
                                          background: selected ? "var(--primary)" : "transparent",
                                          color: selected
                                            ? "#fff"
                                            : available
                                            ? "rgba(245,245,245,0.72)"
                                            : "rgba(245,245,245,0.2)",
                                          textDecoration: available ? "none" : "line-through",
                                          transition: "all 0.12s",
                                        }}
                                      >
                                        {size}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Selection prompt */}
                                {!canAdd && hasSizes && !picker.selectedSize && (
                                  <p
                                    style={{
                                      fontFamily: "var(--font-mono)",
                                      fontSize: "0.65rem",
                                      color: "rgba(245,245,245,0.35)",
                                      fontStyle: "italic",
                                      margin: "6px 0 0",
                                    }}
                                  >
                                    Select a size
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Loading state */}
                        {picker.expanded && picker.status === "loading" && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              paddingBottom: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "14px",
                                height: "14px",
                                borderRadius: "50%",
                                border: "2px solid rgba(215,43,43,0.3)",
                                borderTopColor: "var(--primary)",
                                animation: "spin 0.7s linear infinite",
                              }}
                            />
                            <p
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.65rem",
                                color: "rgba(245,245,245,0.42)",
                              }}
                            >
                              Loading options...
                            </p>
                          </div>
                        )}

                        {/* Error state */}
                        {picker.expanded && picker.status === "error" && (
                          <p
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.65rem",
                              color: "var(--primary)",
                              paddingBottom: "10px",
                            }}
                          >
                            Couldn&apos;t load options — try again.
                          </p>
                        )}

                        {/* Price + CTA row */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "auto",
                            paddingTop: "10px",
                          }}
                        >
                          <motion.span
                            key={displayPrice}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 900,
                              fontSize: "1.25rem",
                              color: "var(--primary)",
                            }}
                          >
                            {displayPrice ? `$${displayPrice.toFixed(2)}` : "—"}
                          </motion.span>

                          {canAdd ? (
                            <button
                              onClick={() => handleAddPODItem(product)}
                              style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                fontSize: "0.72rem",
                                fontFamily: "var(--font-display)",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                cursor: "pointer",
                                border: "none",
                                background: isAdded ? "rgba(215,43,43,0.7)" : "var(--primary)",
                                color: "#fff",
                                transition: "background 0.15s",
                              }}
                            >
                              {isAdded ? "Added" : "Add to Cart"}
                            </button>
                          ) : picker.expanded ? (
                            <span
                              style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                fontSize: "0.72rem",
                                fontFamily: "var(--font-display)",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                border: "1px solid rgba(215,43,43,0.2)",
                                color: "rgba(215,43,43,0.35)",
                                cursor: "not-allowed",
                              }}
                            >
                              Add to Cart
                            </span>
                          ) : (
                            <button
                              onClick={() => openVariantPicker(product)}
                              style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                fontSize: "0.72rem",
                                fontFamily: "var(--font-display)",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                cursor: "pointer",
                                border: "1px solid var(--primary)",
                                background: "transparent",
                                color: "var(--primary)",
                                transition: "background 0.15s, color 0.15s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "var(--primary)";
                                e.currentTarget.style.color = "#fff";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "var(--primary)";
                              }}
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
          </div>

          {/* Empty filtered state */}
          {!loading && filteredProducts.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
                color: "rgba(245,245,245,0.28)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
              }}
            >
              No products in this category yet.
            </div>
          )}
        </section>
      </Suspense>

      {/* Bottom tagline strip */}
      <section
        style={{
          background: "var(--bg-elevated)",
          borderTop: "1px solid rgba(215,43,43,0.15)",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(245,245,245,0.28)",
            margin: 0,
          }}
        >
          Print-on-demand · Fulfilled by Printful · Ships direct to your door
        </p>
      </section>

      {/* Spin keyframe for loading spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}
