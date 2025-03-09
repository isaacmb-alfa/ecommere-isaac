import { useContext, useState, useEffect } from 'react';
import logo from '/comprafacil.svg'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCartContext, NavBarContext } from '@/context/index';
import { useAuthContext } from '@/Hook/useAuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { getMeUserService } from '@/Service/userService';
import { getProductsService } from '@/Service/productService';
import { CartModal } from '../components/CartModal';

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, updateSearchCriteria, , setItems] = useContext(NavBarContext);
    const { cartItems, setCartItems, clearCart } = useCartContext();
    const { logout, isAuth, userPayload } = useAuthContext();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const uniqueCategories = [...new Set(state.items.map(item => item.category))];

    useEffect(() => {
        const fetchUserData = async () => {
            if (isAuth) {
                try {
                    const token = localStorage.getItem('token');
                    const userData = await getMeUserService(token);
                    console.log(userData.data.first_name);
                    
                    setUserName(userData?.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [isAuth]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductsService();
                localStorage.setItem('products', JSON.stringify(response.data));
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const linkIsActive = (isActive) => isActive ? "navbar__links-item-li navbar__links-item-li--is-active" : "navbar__links-item-li";
    const handleSearchChange = (e) => {
        updateSearchCriteria(e.target.value, state.searchCategory);
    };

    const handleCategoryChange = (e) => {
        updateSearchCriteria(state.searchQuery, e.target.value);
    };

    const handleLogout = () => {
        logout();
        clearCart(); // Vaciar el carrito al hacer logout
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">
                    <img src={logo} alt="Logo" className="navbar__logo-image" onClick={() => navigate('/')} />
                </div>
                <ul className="navbar__links">
                    {userPayload && userPayload.role === 'ADMIN' ? (
                        <>
                            <li className="navbar__links-item">
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>
                        </>

                    ) : (
                        <>
                            <li className="navbar__links-item">
                                <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/">Products</NavLink>
                            </li>
                            {isAuth && (
                                <li className="navbar__links-item">
                                    <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/favorite">Favorite</NavLink>
                                </li>
                            )}
                            <li className="navbar__links-item">
                                <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/category">Category</NavLink>
                            </li>
                        </>
                    )}


                </ul>
                <div className="navbar__actions">
                    <div className="navbar__actions-cart">
                        <a href="#carrito" onClick={() => setIsModalOpen(true)}>
                        <HiOutlineShoppingCart className='navbar__actions-cart-icon' />
                            {cartItems.length > 0 && (
                                <span className="cart-count">{cartItems.length}</span>
                            )}</a>
                    </div>
                    {isAuth ? (
                        <>
                            <li className='navbar__links-item'>
                                <NavLink className={({ isActive }) => linkIsActive(isActive)} onClick={handleLogout}>Logout</NavLink>
                            </li>
                            <div className="navbar__welcome-message">
                                Welcome, {userName.first_name}!
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="navbar__actions-auth">
                                <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/singin">Sing In</NavLink>
                                <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/singup">Sing Up</NavLink>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="navbar__search">
                <input
                    type="text"
                    placeholder="Search Products..."
                    className="navbar__search-input"
                    value={state.searchQuery}
                    onChange={handleSearchChange}
                />
                <select className="navbar__search-category" onChange={handleCategoryChange} value={state.searchCategory}>
                    <option value="">All Categories</option>
                    {uniqueCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <CartModal
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </nav>
    );
}

export default Navbar;