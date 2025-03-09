// src/pages/CartPage.js
import { useCartContext } from '../context/index';
import { useNavigate } from 'react-router-dom';

export function CartPage() {
    const { cartItems, total, removeItemFromCart, updateItemQuantity } = useCartContext();
    const navigate = useNavigate();

    const handleQuantityChange = (itemId, newQuantity) => {
        updateItemQuantity(itemId, Number(newQuantity));
    };

    return (
        <div className="cart-page">
            <h1>Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p>Precio: ${item.price}</p>
                            </div>
                            <div className="cart-item-actions">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                />
                                <button onClick={() => removeItemFromCart(item.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h2>Total: ${total}</h2>
                        <button onClick={() => navigate('/payment')}>Ir a pagar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
