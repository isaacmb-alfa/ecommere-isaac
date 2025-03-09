import React from 'react';
import { useForm } from 'react-hook-form';
import '@/styles/products.scss';

const ProductForm = ({ onSubmit, editingProduct, setEditingProduct, reset }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <button onClick={() => { setEditingProduct(null); reset(); }}>Add Product</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                <div className="form-group">
                    <label htmlFor="product_name">Name</label>
                    <input
                        id="product_name"
                        type="text"
                        placeholder="Name"
                        defaultValue={editingProduct ? editingProduct.product_name : ''}
                        {...register('product_name', { required: 'Name is required' })}
                    />
                    {errors.product_name && <span className="error">{errors.product_name.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Description"
                        defaultValue={editingProduct ? editingProduct.description : ''}
                        {...register('description', { required: 'Description is required' })}
                    />
                    {errors.description && <span className="error">{errors.description.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="Price"
                        defaultValue={editingProduct ? editingProduct.price : ''}
                        {...register('price', { required: 'Price is required' })}
                    />
                    {errors.price && <span className="error">{errors.price.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Category"
                        defaultValue={editingProduct ? editingProduct.category : ''}
                        {...register('category', { required: 'Category is required' })}
                    />
                    {errors.category && <span className="error">{errors.category.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        id="image"
                        type="text"
                        placeholder="Image URL"
                        defaultValue={editingProduct ? editingProduct.image : ''}
                        {...register('image', { required: 'Image URL is required' })}
                    />
                    {errors.image && <span className="error">{errors.image.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <input
                        id="brand"
                        type="text"
                        placeholder="Brand"
                        defaultValue={editingProduct ? editingProduct.brand : ''}
                        {...register('brand', { required: 'Brand is required' })}
                    />
                    {errors.brand && <span className="error">{errors.brand.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="is_active">Is Active</label>
                    <select
                        id="is_active"
                        defaultValue={editingProduct ? editingProduct.is_active : ''}
                        {...register('is_active', { required: 'Is Active is required' })}
                    >
                        <option value="">Select Status</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    {errors.is_active && <span className="error">{errors.is_active.message}</span>}
                </div>
                <div className="form-buttons">
                    <button type="submit">{editingProduct ? 'Save' : 'Add'}</button>
                    <button type="button" onClick={() => { setEditingProduct(null); reset(); }}>Cancel</button>
                </div>
            </form>
        </>
    );
};

export default ProductForm;