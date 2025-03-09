import { createContext, useState, useContext } from 'react';

const LogoutContext = createContext();


export const LogoutProvider = ({ children }) => {
    const [shouldSaveCart, setShouldSaveCart] = useState(true);

    return (
        <LogoutContext.Provider value={{ shouldSaveCart, setShouldSaveCart }}>
            {children}
        </LogoutContext.Provider>
    );
};

export const useLogoutContext = () => useContext(LogoutContext);