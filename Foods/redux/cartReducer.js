
const initialState = {
  cartItems: {},
};

const cartReducer = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_TO_CART':
      const addId = action.payload;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [addId]: (state.cartItems[addId] || 0) + 1,
        }
      };
    
    case 'REMOVE_FROM_CART':
      const removeId = action.payload;
      if  (state.cartItems[removeId] <= 0) return state;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [removeId]: (state.cartItems[removeId] || 0) - 1,
        }
      };

    case 'CLEAR_CART':
      return {...state, cartItems: {}};
    
    default:
      return state;
  }
};

export default cartReducer;
