
export const getCartFromLocalStorage = (userId) => {
    const localCart = localStorage.getItem(`cart_${userId}`);
    return localCart ? JSON.parse(localCart) : [];
};

export const saveCartToLocalStorage = (userId, cartItems, shouldSaveCart) => {
    console.log(userId, cartItems);
    
    if (!shouldSaveCart) return;
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
};

export const clearCartModal = (userId, setCartItems) => {
    if (setCartItems) {
        setCartItems([]);
    }
};
export const createCartInLocalStorage = (userId) => {
    if (!localStorage.getItem(`cart_${userId}`) && userId !== null ) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify([]));
    }
}