import { useCartContext } from '../context/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/cartModal.scss';

export function CartModal({ isVisible, onClose }) {
    const { cartItems, total, removeItemFromCart, updateItemQuantity, clearCart } = useCartContext();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    const handleQuantityChange = (itemId, newQuantity) => {
        updateItemQuantity(itemId, Number(newQuantity));
    };

    const handleIncrement = (itemId, currentQuantity) => {
        updateItemQuantity(itemId, currentQuantity + 1);
    };

    const handleDecrement = (itemId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateItemQuantity(itemId, currentQuantity - 1);
        }
    };
    const handleClearCart = () => {
        clearCart();
    };

    return (
        <div className={`modal-overlay ${isVisible ? 'show' : ''}`}>
            <div className="modal">
                <div className="modal-header">
                    <h2>Carrito de Compras</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {cartItems.length === 0 ? (
                        <p>El carrito está vacío</p>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map(item => {
                                const product = products.find(p => p.id === item.id);
                                return (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-image">
                                            <img src={product?.image} alt={product?.name} />
                                        </div>
                                        <div className="cart-item-info">
                                            <h3>{product?.name}</h3>
                                            <p>Precio: ${product?.price}</p>
                                        </div>
                                        <div className="cart-item-actions">
                                            <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            />
                                            <button onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                                            <button onClick={() => removeItemFromCart(item.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <div className="total">
                        <h3>Total: ${total}</h3>
                    </div>
                    <button onClick={() => navigate('/payment')}>Ir a pagar</button>
                    <button onClick={handleClearCart}>Vaciar Carrito</button>
                </div>
            </div>
        </div>
    );
}