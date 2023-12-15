import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <ProductContext.Provider value={{ selectedProduct, handleSelectProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
