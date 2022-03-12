/*utility functions allow us to keep files clean and organize functions that we may need in multiple files in one location */
export const addNewOrder = (orderToAdd, Orders) => {
  // new array with all the existing cartItems, but also with the an object cartItemToAdd with a base quantity of 1
  //In this way, any of the subsiquent items will reference the base quantity base value
  return [...Orders, { ...orderToAdd }];
};
