import { useState, useContext, createContext } from "react";


const SearchContext = createContext();
const GlobalSearch = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        resutls: []
    });

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, GlobalSearch };