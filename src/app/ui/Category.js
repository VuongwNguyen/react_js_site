import React, { useCallback, useEffect, useState } from 'react';
import '../styles/CategoryStyle.css';
import AxiosInstance from '../../helper/AxiosInstance';

function Category(props) {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [categoryNoneParent, setCategoryNoneParent] = useState([]);
    const [showEditPopup, setshowEditPopup] = useState(false);
    const [showAddPopup, setshowAddPopup] = useState(false);
    const [showDeletePopup, setshowDeletePopup] = useState(false);
    const [NameCategory, setNameCategory] = useState('');
    const [ParentId, setParentId] = useState(null);
    const [description, setDescription] = useState('');

    function handleClosePopup() {
        setshowEditPopup(false);
        setshowAddPopup(false);
        setshowDeletePopup(false);
    }

    function handleShowEditPopup(category) {
        setshowEditPopup(true);
        setCategory(category);
        setNameCategory(category.name);
        setParentId(category.parent_id?._id);
        setDescription(category.description);

    }

    function handleShowDeletePopup(category) {
        setshowDeletePopup(true);
        setCategory(category);
    }

    async function handleEditCategory() {
        const body = {
            id: category._id,
            data: {
                name: NameCategory,
                parent_id: ParentId,
                description: description,
            }
        };
        try {
            const response = await AxiosInstance().post('category/updateCategory', body);
            if (response.status === true) {
                const newCategory = categories.map((item) => {
                    if (item._id === response.category._id) {
                        return response.category;
                    }
                    return item;
                });
                console.log('====================================');
                console.log(newCategory);
                console.log('====================================');
                alert('Edit category successfully');
                setCategories(newCategory);
                setshowEditPopup(false);
                setNameCategory('');
                setParentId(null);
                setDescription('');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function handleAddCategory() {
        const body = {
            data: {
                name: NameCategory,
                parent_id: ParentId,
                description: description,
            }
        };
        try {
            const response = await AxiosInstance().post('category/createCategory', body);
            if (response.status === true) {
                alert('Add category successfully');
                setshowAddPopup(false);
                setCategories([...categories, response.category]);
                setNameCategory('');
                setParentId(null);
                setDescription('');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function handleDeleteCategory() {
        const body = {
            id: category._id,
        };
        try {
            const response = await AxiosInstance().post('category/deleteCategory', body);
            if (response.status === true) {
                const newCategory = categories.filter((item) => item._id !== category._id);
                alert('Delete category successfully');
                setCategories(newCategory);
                setshowDeletePopup(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance().get('/category/getAllCategory');
                if (response.status === true) {
                    setCategories(response.categories);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance().get('/category/getCategoryNoneParent');
                if (response.status === true) {
                    setCategoryNoneParent(response.categories);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);
    //format date to hh:mm:ss-dd/mm/yyyy
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
            {showAddPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Add Item</h2>
                        <form>
                            <input type="text"
                                placeholder="Category Name"
                                value={NameCategory}
                                onChange={(e) => setNameCategory(e.target.value)} />
                            <select value={ParentId} onChange={(e) => setParentId(e.target.value)}>
                                <option value="0">Parent Id</option>
                                {categoryNoneParent.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />


                            <button type="button" onClick={handleAddCategory} >Save</button>
                        </form>
                    </div>
                </div>)}
            {showEditPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Edit Item</h2>
                        <form>
                            <input type="text"
                                placeholder="Category Name"
                                value={NameCategory}
                                onChange={(e) => setNameCategory(e.target.value)} />
                            <select value={ParentId} onChange={(e) => setParentId(e.target.value)}>
                                <option value="0">Parent Id</option>
                                {categoryNoneParent.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                            <button type="button" onClick={handleEditCategory} >Save</button>
                        </form>
                    </div>
                </div>)}
            {showDeletePopup && (
                 <div className="popup">
                 <div className="popup-content">
                     <span className="close" onClick={handleClosePopup}>&times;</span>
                     <h2>Delete Item</h2>
                     <p>Are you sure you want to delete this item?</p>
                     <div className='action'>
                         <button className='bad-action' type="button" onClick={handleDeleteCategory}>Yes</button>
                         <button className='good-action' type="button" onClick={handleClosePopup}>No</button>
                     </div>

                 </div>
             </div>)}
            <div className="header">
                <h1>Category</h1>
                <button type='button'
                    onClick={() => setshowAddPopup(true)}
                >Add Category</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Category Name</th>
                        <th>Parent</th>
                        <th>Created at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) =>
                    (<tr key={category._id}>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        <td>{category.parent_id?.name}</td>
                        <td>{formatDate(category.created_at)}</td>
                        <td>
                            <button type='button' onClick={() => handleShowEditPopup(category)} className='good-action'>Edit</button>
                            <button type='button' onClick={()=>handleShowDeletePopup(category)} className='bad-action'>Delete</button>
                        </td>
                    </tr>)
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Category;