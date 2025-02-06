// BeveragesP Component Update
import React from "react";
import "./BeveragesP.css";

function BeveragesP({ beveragesData = [], addToCart, loading, error }) {
  const skeletonCards = new Array(6).fill("");

  return (
    <div className="BeveragesP__Container">
      {loading ? (
        skeletonCards.map((_, index) => (
          <div key={index} className="BeveragesP__Card BeveragesP__Skeleton">
            <div className="BeveragesP__ImagePlaceholder" />
            <span className="BeveragesP__TextPlaceholder">Loading...</span>
            <p className="BeveragesP__TextPlaceholder">Fetching details...</p>
          </div>
        ))
      ) : error ? (
        <p className="BeveragesP__Error">{error}</p>
      ) : beveragesData.length === 0 ? (
        <p className="BeveragesP__NoData">No beverages found</p>
      ) : (
        beveragesData.map((beverage) => (
          <div className="BeveragesP__Card" key={beverage.id}>
            <img
              className="BeveragesP__Image"
              src={`http://springpizzaapp.onrender.com${beverage.image}` || "default-placeholder.png"}
              alt={beverage.name || "Beverage"}
            />
            <span className="BeveragesP__Name">{beverage.name}</span>
            <p className="BeveragesP__Description">{beverage.description}</p>

            {/* Render size selection if sizes are available */}
            {beverage.sizes && (
              <select
                className="BeveragesP__SelectSize"
                defaultValue={beverage.sizes.split(",")[0]}
              >
                {beverage.sizes.split(",").map((size, index) => (
                  <option key={index} value={size.trim()}>
                    {size.trim()}
                  </option>
                ))}
              </select>
            )}

            <button
              className="BeveragesP__AddToCartButton"
              onClick={() => addToCart(beverage)}
            >
              Add to Cart - ₹{beverage.prices?.[0]?.price || 0}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default BeveragesP;
