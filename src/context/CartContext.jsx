import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from '@/Hook/useAuthContext';
import { getCartFromLocalStorage, saveCartToLocalStorage, createCartInLocalStorage } from '@/utils/cartStorage';
import { useLogoutContext } from './LogoutProvider';

const CartContext = createContext();

export function CartProvider({ children }) {
    const { shouldSaveCart } = useLogoutContext();
    const { userPayload, isAuth, userId } = useAuthContext();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if (isAuth && userPayload) {
            createCartInLocalStorage(userId);
            const localCart = getCartFromLocalStorage(userId);
            setCartItems(localCart);
        } else {
            setCartItems([]);
        }
    }, [isAuth, userPayload, userId]);

    useEffect(() => {
        const calculateTotal = () => {
            const newTotal = cartItems.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);
            setTotal(newTotal);
            console.log(userPayload);
        };
        calculateTotal();
    }, [cartItems, isAuth, userPayload, userId, isLoggingOut]);
    
    useEffect(()=>{
        if (isAuth && userId) {
            saveCartToLocalStorage(userId, cartItems, shouldSaveCart);
        }
    }, [userPayload, cartItems])

    const addItemToCart = (item) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(i => i.id === item.id);
            if (itemExists) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeItemFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateItemQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const loadCart = () => {
        const localCart = getCartFromLocalStorage(userId);
        setCartItems(localCart);
    };

    const startLogout = () => {
        setIsLoggingOut(true);
    };

    const endLogout = () => {
        setIsLoggingOut(false);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            clearCart,
            loadCart,
            total,
            addItemToCart,
            removeItemFromCart,
            updateItemQuantity,
            startLogout,
            endLogout
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
