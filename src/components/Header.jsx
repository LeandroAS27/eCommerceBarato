import { useContext } from "react";
import { FaShoppingCart } from 'react-icons/fa'
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const Header = ({ offers }) => {
    const {searchTerm, setSearchTerm} = useContext(SearchContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if(offers && offers.length > 0) {

            const foundProduct = offers.find(offer => offer.title.toLowerCase().includes(searchTerm.toLowerCase()));
            if (foundProduct) {
                navigate(`/offer/${foundProduct.id}`, { state: {product: foundProduct}});
            }else{
            alert('Produto nao encontrado');
        }
        } else {
            alert('Carregando produtos, tente novamente.')
        }
    }   

    return(
        <div className="relative w-64">
            <input 
            type="text"
            placeholder="Pesquise o produto aqui..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaShoppingCart className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            onClick={handleSubmit}
            />
        </div>
    )
}

export default Header;