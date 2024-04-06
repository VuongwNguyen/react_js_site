import React, { useState, useContext, createContext } from 'react'


// tạo context
export const AppContext = createContext()
// tạo dữ liệu dùng chung cho app
export const AppProvider = (props) => {
    const [account, setAccount] = useState(null);
    
    
    return (
        <AppContext.Provider value={{
            account, setAccount,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
