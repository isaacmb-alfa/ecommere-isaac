import {  useContext, useState } from "react";
import HeartAnimation from "./HeartAnimation";
import { useCartContext, AuthContext } from "../context/index";
import Toaster  from './Toaster.jsx';

function CardComponent({ productId, userId, nameProduct, img, price, description }) {
    const { addItemToCart } = useCartContext();
    const [isClick, setClick] = useState(false);
    const { isAuth } = useContext(AuthContext);
    const [showToast, setShowToast] = useState(false);

    const priceN = parseInt(price);

    // Calcular un descuento aleatorio entre el 5% y el 60%
    const discountPercentage = Math.floor(Math.random() * (60 - 5 + 1)) + 5;
    const originalPrice = priceN / (1 - discountPercentage / 100);
    const classLoged = isAuth ? 'card__actions-add-to-cart' : 'card__actions-add-to-cart__disabled';

    const shortNameProduct = nameProduct.substring(0,17) + '...';
    const shortDescription = description.substring(0, 100) + '...';

    const handleCloseToast = () => {
        setShowToast(false);
    }
    const handleAddToCart = () => {
        // Asegúrate de que el producto tenga la estructura necesaria
        // Por ejemplo: { id, name, price, quantity }
        addItemToCart({
            id: productId,
            name: nameProduct,
            price: price,
            quantity: 1
        });
    };

    const handleAddToCartClick = (e) => {
       e.stopPropagation()
        if (!isAuth) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 4000); 
            return;
        }
        handleAddToCart();
    };

    return (
        <>
            <div className="card">
                <div className="card__image">
                    <img src={img} alt={shortNameProduct} />
                    <div className="card__actions-favorite" onClick={(e) => e.stopPropagation() }>
                        <HeartAnimation productId={productId} userId={userId} />
                    </div>
                </div>
                <div className="card__details">
                    <h2 className="card__details-title">{shortNameProduct}</h2>
                    <p className="card__details-description">
                        {shortDescription}
                    </p>
                    <p className="card__details-price">
                        <span className="card__details-price-before">
                            Before ${originalPrice.toFixed(2)}
                        </span>
                    </p>
                    <p>
                        <span className="card__details-price-ofert">
                            Now ${priceN.toFixed(2)} ({discountPercentage}% off)
                        </span>
                    </p>

                    <div className="card__actions" onClick={handleAddToCartClick}>
                        <button className={classLoged} >Add to cart</button>
                    </div>
                </div>
            </div>
            {showToast && <Toaster duration={4000} message="You need to be logged in to add items to the cart" onClose={handleCloseToast} />}
        </>
    )
}

export default CardComponent