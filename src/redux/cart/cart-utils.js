/*utility functions allow us to keep files clean and organize functions that we may need in multiple files in one location */
export const addItemToCart = (cartItemToAdd, cartItems) => {
  //we will check if the cartItem exist
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  //if cartItem is not found in the array, we want to return
  // new array with all the existing cartItems, but also with the an object cartItemToAdd with a base quantity of 1
  //In this way, any of the subsiquent items will reference the base quantity base value
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItemToRemove, cartItems) => {
  //we will check if the cartItem exist
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
