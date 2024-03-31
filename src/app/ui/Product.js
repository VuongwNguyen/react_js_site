import React, { useCallback, useEffect, useState } from 'react';
import '../styles/ProductsStyles.css';

import AxiosInstance from '../../helper/AxiosInstance';

function Product(props) {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [showEditPopup, setshowEditPopup] = useState(false);
    const [showAddPopup, setshowAddPopup] = useState(false);
    const [showDeletePopup, setshowDeletePopup] = useState(false);
    const [NameProduct, setNameProduct] = useState('');
    const [PriceProduct, setPriceProduct] = useState('');
    const [QuantityProduct, setQuantityProduct] = useState('');
    const [Categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(null);
    const handleEditProduct = (product) => {
        setshowEditPopup(true);
        setProduct(product);
        console.log('product:', product);
        setNameProduct(product.name);
        setPriceProduct(product.price);
        setQuantityProduct(product.quantity);
        setCategorySelected(product.category_id);
    };
    const handleShowAddPopup = () => {
        setshowAddPopup(true);
    }

    const handleShowDeletePopup = (product) => {
        setshowDeletePopup(true);
        setProduct(product);
    }

    const handleClosePopup = () => {
        setshowEditPopup(false);
        setshowAddPopup(false);
        setshowDeletePopup(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (keyword === '') {
                    const response = await AxiosInstance().get('/product/getAllProduct');
                    if (response.status === true) {
                        setProducts(response.products);
                    }
                } else {
                    const response = await AxiosInstance().get(`/product/getProductByCondition?keyword=${keyword}`);
                    // setProducts(response.products);
                    if (response.status === true) {
                        setProducts(response.products);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [keyword]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance().get('/category/getCategoryNoneParent');
                if (response.status === true) {
                    setCategories(response.categories);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    async function handleSaveProduct() {
        try {
            const body = {
                id: product._id,
                data: {
                    name: NameProduct,
                    price: PriceProduct,
                    quantity: QuantityProduct,
                },
            };
            const response = await AxiosInstance().post('/product/updateProduct', body);
            if (response.status === true) {
                const newProducts = products.map((item) => {
                    if (item._id === product._id) {
                        return {
                            ...item,
                            name: NameProduct,
                            price: PriceProduct,
                            quantity: QuantityProduct,
                        };
                    }
                    return item;
                });
                setProducts(newProducts);
                setshowEditPopup(false);
                setNameProduct('');
                setPriceProduct('');
                setQuantityProduct('');
                setCategorySelected(null);
                alert('Update product successfully');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function handleDeleteProduct() {
        try {
            const response = await AxiosInstance().post(`/product/deleteProduct`, { id: product._id });
            if (response.status === true) {
                const newProducts = products.filter((item) => item._id !== product._id);
                setProducts(newProducts);
                setshowDeletePopup(false);
                alert('Delete product successfully');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function handleAddProduct() {
        try {
            if (categorySelected === '0') {
                alert('Please choose category');
                return;
            } else if (NameProduct === '' || PriceProduct === '' || QuantityProduct === '') {
                alert('Please fill in all fields');
                return;
            }
            const body = {
                data: {
                    name: NameProduct,
                    price: PriceProduct,
                    quantity: QuantityProduct,
                    category_id: categorySelected,

                }
            };
            const response = await AxiosInstance().post('/product/createProduct', body);
            if (response.status === true) {
                const newProducts = [...products, response.product];
                setProducts(newProducts);
                setshowAddPopup(false);
                setNameProduct('');
                setPriceProduct('');
                setQuantityProduct('');
                setCategorySelected(null);
                alert('Add product successfully');
            } else {
                alert('Add product failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const formatDate = useCallback((date) => {
        const d = new Date(date);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const hour = d.getHours();
        const minute = d.getMinutes();
        const second = d.getSeconds();
        return `${hour}:${minute}:${second}-${day}/${month}/${year}`;
    }, []);

    return (
        <div>
            {showEditPopup &&
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Edit Item</h2>
                        <form>
                            <input
                                type="text"
                                value={NameProduct}
                                id="itemName"
                                onChange={(e) => setNameProduct(e.target.value)}
                                placeholder='Item Name'
                            />
                            <input
                                type="text"
                                id="itemPrice"
                                placeholder='Item Price'
                                value={PriceProduct}
                                onChange={(e) => setPriceProduct(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Item Quantity'
                                id="itemQuantity"
                                value={QuantityProduct}
                                onChange={(e) => setQuantityProduct(e.target.value)}
                            />
                            <select value={categorySelected} onChange={(e) => setCategorySelected(e.target.value)}>
                                <option value="0">Category</option>
                                {Categories.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                            <button type="button" onClick={handleSaveProduct}>Save</button>
                        </form>
                    </div>
                </div>}
            {showAddPopup &&
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Add Item</h2>
                        <form>
                            <input
                                type="text"
                                id="itemName"
                                placeholder='Item Name'
                                onChange={(e) => setNameProduct(e.target.value)}
                            />
                            <input
                                type="text"
                                id="itemPrice"
                                placeholder='Item Price'
                                onChange={(e) => setPriceProduct(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Item Quantity'
                                id="itemQuantity"
                                onChange={(e) => setQuantityProduct(e.target.value)}
                            />
                            <select value={setCategorySelected} onChange={(e) => setCategorySelected(e.target.value)}>
                                <option value="0">Category</option>
                                {Categories.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                            <button type="button" onClick={handleAddProduct}>Save</button>
                        </form>
                    </div>
                </div>}

            {showDeletePopup &&
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Delete Item</h2>
                        <p>Are you sure you want to delete this item?</p>
                        <div className='action'>
                            <button className='bad-action' type="button" onClick={handleDeleteProduct}>Yes</button>
                            <button className='good-action' type="button" onClick={handleClosePopup}>No</button>
                        </div>

                    </div>
                </div>}
            <div className="header">
                <h1>Product</h1>
                <input type="text" placeholder="Search..." onChange={(e) => setKeyword(e.target.value)} />
                <button type='button' onClick={handleShowAddPopup}>Add Product</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product Quantity</th>
                        <th>Created at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price} VNĐ</td>
                            <td>{product.quantity}</td>
                            <td>{formatDate(product.created_at)}</td>
                            <td>
                                <button onClick={() => handleEditProduct(product)} className='good-action'>Edit</button>
                                <button onClick={() => handleShowDeletePopup(product)} className='bad-action'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product;