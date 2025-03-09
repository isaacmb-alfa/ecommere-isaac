import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Toaster from './Toaster.jsx';

const Modal = ({ isOpen, onClose, product }) => {
    const { isAuth } = useContext(AuthContext);
    const [showToast, setShowToast] = useState(false);
    const priceN = parseInt(product?.price);
    const discountPercentage = Math.floor(Math.random() * (60 - 5 + 1)) + 5;
    const originalPrice = priceN / (1 - discountPercentage / 100);

    if (!isOpen) return null;

    const classLoged = isAuth ? 'modal-button' : 'modal-button__disabled';
    const handleAddToCartClick = (e) => {
        e.stopPropagation();
        if (!isAuth) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 4000); // Duración de la alerta en milisegundos
        }
    };
    const handleCloseToast = () => {
        setShowToast(false);
    }

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={onClose}>X</button>
                    <div className="modal-details">
                        <img src={product.image} alt={product.product_name} className="modal-image" />
                        <h2 className="modal-title">{product.product_name}</h2>
                        <p className="modal-description">{product.description}</p>
                        <p className="modal__details-price">
                            <span className="card__details-price-before">
                                Before ${originalPrice.toFixed(2)}
                            </span>
                        </p>
                        <p className="modal-price">
                            <span className="card__details-price-ofert">
                                Now ${priceN.toFixed(2)} ({discountPercentage}% off)
                            </span>
                        </p>
                    </div>
                    <div className="modal-actions" onClick={handleAddToCartClick}>
                        <button className={classLoged} >Add to Cart</button>
                    </div>
                </div>
            </div>
            {showToast && <Toaster duration={4000} message="You need to be logged in to add items to the cart" onClose={handleCloseToast} />}
        </>
    );
};

export default Modal;