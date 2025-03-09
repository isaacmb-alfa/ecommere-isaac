import { useState, useEffect, useContext } from "react";
import CardComponent from "../components/CardComponent";
import Modal from "../components/Modal";
import { NavBarContext } from './../context/NavBarProvider';
import { useAuthContext } from '@/Hook/useAuthContext';
import { getAllItemsService } from '@/Service/itemsService';
import CardAnimated from "../components/CardAnimated";

function Home() {
    const [loading, setLoading] = useState(true);
    const [, , filteredItems, setItems] = useContext(NavBarContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { isAuth } = useAuthContext();
    const userId = localStorage.getItem('userId') || null;

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const response = await getAllItemsService();
                if (response.status === 200) {
                    setItems(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.log("Ocurrio un error en Home", error)
            }
        }
        fetchItemsData()
    }, []);

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) return <div className="title-home">Loading...</div>

    return (
        <>
            <h1 className="title-home">Products</h1>
            <div className="card-container">
                {filteredItems.length === 0 ? (
                    <div>No hay productos disponibles</div>
                ) : (
                    filteredItems.map((product, index) => (
                        <CardAnimated
                            key={product.id}
                            product={product}
                            index={index}
                            onClick={() => handleCardClick(product)}
                            userId={userId}
                        />
                    ))
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
        </>
    )
}

export default Home;
