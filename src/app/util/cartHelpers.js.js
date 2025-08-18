export const getLocalStorageCart = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart_product");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

export const saveToLocalStorage = (item) => {
  if (typeof window !== "undefined") {
    const existingCart = getLocalStorageCart();
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart_product", JSON.stringify(updatedCart));
  }
};

export const removeFromLocalStorage = (itemId) => {
  if (typeof window !== "undefined") {
    const existingCart = getLocalStorageCart();
    const updatedCart = existingCart.filter(item => item.id !== itemId);
    localStorage.setItem("cart_product", JSON.stringify(updatedCart));
  }
};