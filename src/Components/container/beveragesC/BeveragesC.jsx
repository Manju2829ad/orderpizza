// BeveragesC Component without fetchPriceByPizzaId
import React, { useContext, useState, useEffect } from "react";
import BeveragesP from "../../presentational/beveragesP/BeveragesP"
import { CartContext } from "../cartC/CartProvider";

function BeveragesC() {
  const { addToCart, fetchPizza } = useContext(CartContext);

  const [beveragesData, setBeveragesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadBeveragesData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPizza("beverages");
        if (!mounted) return;
        setBeveragesData(data);
      } catch (err) {
        if (mounted) {
          setError("Failed to load beverages. Please try again later.");
          console.error("Failed to fetch beverages data:", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadBeveragesData();

    return () => {
      mounted = false;
    };
  }, [fetchPizza]);

  return (
    <div>
      <h2>Beverages</h2>
      <BeveragesP
        beveragesData={beveragesData}
        addToCart={addToCart}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default React.memo(BeveragesC);