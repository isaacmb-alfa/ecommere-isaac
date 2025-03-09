import { createContext, useState } from 'react';

export const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [state, setState] = useState({
        items: [], // Aquí se almacenarán los elementos de la API
        searchQuery: '', // Estado para el término de búsqueda
        searchCategory: '', // Estado para la categoría de búsqueda
    });


    const updateSearchCriteria = (query, category) => {
        setState(prevState => ({
            ...prevState,
            searchQuery: query,
            searchCategory: category,
        }));


    };
    const filteredItems = state.items.filter(item => {
        const matchesName = item.product_name.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCategory = state.searchCategory === '' || item.category.toLowerCase() === state.searchCategory.toLowerCase();
        return matchesName && matchesCategory;
    });

    const setItems = (items) => {
        setState(prevState => ({
            ...prevState,
            items: items,
        }));
    };


    return (
        <NavBarContext.Provider value={[state, updateSearchCriteria, filteredItems, setItems]}>
            {children}
        </NavBarContext.Provider>
    );
};