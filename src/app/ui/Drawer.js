import React, { useState, useContext } from 'react';
import '../styles/DrawerStyles.css'; // Import CSS file
import Dashboard from './Dashboard'; // Import Dashboard component
import Product from './Product';
import Category from './Category';
import { HambergerMenu, Logout } from 'iconsax-react';
import { AppContext } from '../../context/AppContext';
const Drawer = () => {
    const { account, setAccount } = useContext(AppContext);
    const [currentPage, setCurrentPage] = useState(1); // State để lưu trữ trang hiện tại
    const [toogle, setToogle] = useState(true);

    const handlePageChange = (id) => {
        setCurrentPage(id);
    };

    return (
        <div className="dashboard-container">
            <div className={toogle ? "sidebar" : "sidebarClose"}>
                <div className='header'>
                    <h2 className='title'>Hello, {account?.username}</h2>
                    <Logout variant='Outline' color='red' style={{ cursor: 'pointer' }} onClick={{}} />
                </div>

                <ul>
                    {settings.map((setting, index) => (
                        <li key={index}>
                            <div style={{
                                backgroundColor: currentPage === setting.id ? '#4caf50' : '#e1e1e1',
                                fontWeight: currentPage === setting.id ? '650' : 'normal',
                                flex: 1,
                                padding: 10,
                                cursor: 'pointer',
                                color: currentPage === setting.id ? 'white' : 'black',
                                borderEndStartRadius: 10,
                                borderStartStartRadius: 10,
                            }} onClick={() => handlePageChange(setting.id)}>
                                {setting.name}
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
            <div>
                <button
                    style={{
                        top: 10,
                        left: 10,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => { setToogle(!toogle); setAccount(null) }}><HambergerMenu /></button>
            </div>

            <div className="content">

                {/* Hiển thị nội dung tương ứng với trang hiện tại */}
                {currentPage === 1 && <Dashboard />}
                {currentPage === 3 && <Product />}
                {currentPage === 4 && <Category />}
            </div>
        </div>
    );
};

// Các component content tương ứng với từng trang


export default Drawer;
// Dữ liệu về các trang và liên kết
const settings = [
    { id: 1, name: 'Dashboard', },
    { id: 2, name: 'Order', },
    { id: 3, name: 'Product', },
    { id: 4, name: 'Category', },
];