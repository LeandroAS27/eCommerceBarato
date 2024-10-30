import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [offers, setOffers] = useState([]);

    return(
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, offers, setOffers }}>
            {children}
        </SearchContext.Provider>
    )
}