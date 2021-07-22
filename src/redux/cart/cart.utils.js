export const addItemToCart = (cartItemToAdd, cartItems) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    console.log(existingCartItem);
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [{ ...cartItemToAdd, quantity: 1 }, ...cartItems]
}