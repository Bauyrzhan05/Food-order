import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "./redux/export";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";


export default function FoodItem({ id, name, price, description, image }) {

    const user = useSelector((state) => state.auth.user);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const quantity = cartItems[id];
    const dispatch = useDispatch();

    return (
    <div className="food-gallery">
        <div className="food-card">
            <div className="card-image-container">
            <img 
                className="food-image" 
                src={`http://localhost:3030/images/${image}`} 
                alt={name}
            />
            <div className="image-overlay"></div>
            
            {user && user.role !== "manager" && (
                <div className="cart-controls">
                {!quantity ? (
                    <button 
                    className="add-button"
                    onClick={() => dispatch(addToCart(id))}
                    >
                    <img src={assets.add_icon_white} alt="Add to cart" />
                    </button>
                ) : (
                    <div className="quantity-control">
                    <button onClick={() => dispatch(removeFromCart(id))}>
                        <img src={assets.remove_icon_red} alt="Remove" />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => dispatch(addToCart(id))}>
                        <img src={assets.add_icon_green} alt="Add" />
                    </button>
                    </div>
                )}
        </div>
      )}
        </div>
            <div className="card-body">
                <div className="card-header">
                    <h3 className="food-name">{name}</h3>
                    <div className="rating">
                    <img src={assets.rating_starts} alt="Rating" />
                    </div>
                </div>
                
                <p className="food-description">{description}</p>
                
                <div className="price-container">
                    <span className="price">${price}</span>
                    <div className="price-underline"></div>
                </div>
                {user && user.role !== "manager" ? (
                     <Link to={`/comments/${id}`} className="comment-button">
                        <img src={'https://icon-library.com/images/free-comment-icon/free-comment-icon-17.jpg'} alt="Comment" />
                    </Link>)
                : <></>
                }
            </div>
        </div>
    </div>  
            
    );
}


