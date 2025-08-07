import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    return (
        <GlobalContext.Provider value={{ open, setOpen , cartItems, setCartItems }}>
        {children}
        </GlobalContext.Provider>
    );
};
