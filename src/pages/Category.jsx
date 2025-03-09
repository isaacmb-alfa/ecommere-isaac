import { useState, useEffect } from 'react';
import { getAllItemsService } from '@/Service/itemsService';
import '@/styles/category.scss';

const Category = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getAllItemsService();
                setItems(data);
            } catch (error) {
                setError('Error fetching items');
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    if (loading) {
        return <div className='title-loading'>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const categories = items.data.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div className="category-container">
            {Object.keys(categories).map(category => (
                <div key={category} className="category-section">
                    <h2>{category}</h2>
                    <div className="category-items">
                        {categories[category].map((item, index) => (
                            <div key={item.id} className="category-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <img src={item.image} alt={item.product_name} className="product-image" />
                                <h3>{item.product_name}</h3>
                                <p>{item.description}</p>
                                <p className='category-items__price'>Price: ${item.price}</p>
                                <p className='category-items__sku'>SKU: {item.sku}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Category;