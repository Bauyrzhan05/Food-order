
export const login = (user) => ({type: "LOGIN", payload: user})

export const logout = () => ({type: "LOGOUT"})

export const addToCart = (itemId) => (
    {type: "ADD_TO_CART", payload: itemId}
)

export const removeFromCart = (itemId) => (
    {type: "REMOVE_FROM_CART", payload: itemId}
)

export const clearCart = () => ({type: 'CLEAR_CART'});

