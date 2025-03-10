import { useState, useEffect } from 'react';
import { getProductsService, updateProductService, addProductService, deleteProductService } from '@/Service/productService';
import ProductForm from './ProductForm';
import Pagination from './Pagination';
import ConfirmationModal from './ConfirmationModal';
import { useForm } from 'react-hook-form';
import '@/styles/products.scss';

function Products() {
    const { reset } = useForm();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [editingProduct, setEditingProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProductsService();
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const onSubmit = async (data) => {
        try {
            if (editingProduct) {
                await updateProductService(editingProduct.id, data);
                setSuccessMessage('Product updated successfully!');
            } else {
                await addProductService(data);
                setSuccessMessage('Product added successfully!');
            }
            setEditingProduct(null);
            reset();
            const response = await getProductsService();
            setProducts(response.data);
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProductService(id);
            setSuccessMessage('Product deleted successfully!');
            const response = await getProductsService();
            setProducts(response.data);
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const confirmDeleteProduct = (product) => {
        setProductToDelete(product);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        handleDeleteProduct(productToDelete.id);
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setProductToDelete(null);
        setShowModal(false);
    };

    // Obtener productos actuales
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
        <div className='table-items-container'>
            <h2>Items</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button onClick={() => { setEditingProduct(null); reset(); }}>Add Product</button>
            <table>
                <thead>
                    <tr>
                        <th>IsActive</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>SKU</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.is_active ? 'Yes' : 'No'}</td>
                            <td>{product.product_name}</td>
                            <td>{product.description.slice(0, 20) + '...'}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.sku}</td>
                            <td>
                                <button onClick={() => setEditingProduct(product)}>Edit</button>
                                <button onClick={() => confirmDeleteProduct(product)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            {(editingProduct || !editingProduct) && (
                <ProductForm
                    onSubmit={onSubmit}
                    editingProduct={editingProduct}
                    setEditingProduct={setEditingProduct}
                    reset={reset}
                />
            )}
            
            {showModal && (
                <ConfirmationModal
                    message={`¿Deseas borrar el producto ${productToDelete.product_name}?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
        </>
    );
}

export default Products;