import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import axios from 'axios'
import { SearchContext } from "../context/SearchContext";

const ProductDetails = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { searchTerm } = useContext(SearchContext);
    const [error, setError] = useState(null);
    const categories = ["beauty", "fragrances", "furniture"];

    const navigate = useNavigate();

    const handleBuyClick = (id) => {
        navigate(`/offer/${id}`);
    }

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products',)
                setOffers(response.data.products)
                setLoading(false)
                console.log(response.data)
            } catch (error) {
                // setError('Erro ao buscar o produto')
                setLoading(false)
                console.log(error)
            }
        }
        fetchOffers();
    }, []);
    
      const filteredOffers = offers.filter(offer => 
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return(
        <div>
            {
                categories.map((category) => (
                    <div key={category}>
                        <h2 className="font-bold capitalize text-2xl my-4">{category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {offers
                            .filter((offer) => offer.category === category)
                            .map((offer) => (
                                <motion.div 
                                key={offer.id} 
                                className="border p-4 text-center flex flex-col justify-between max-w-xs mx-auto"
                                initial={{opacity:0, scale: 0.5}}
                                animate={{opacity:1, scale: 1}}
                                transition={{duration: 0.5}}
                                >
                                    <img src={offer.thumbnail} alt={offer.title} className="w-full h-32 object-contain mb-4" />
                                    <h2 className="font-bold text-xl mb-2">{offer.title}</h2>
                                    <p className="text-gray-600 mb-2">{offer.description}</p>
                                    <p className="font-semibold text-left">R${offer.price}</p>
                                    <button 
                                    onClick={() => handleBuyClick(offer.id)}
                                    className="py-1.5 px-2 bg-indigo-500 hover:bg-blue-700 w-24 rounded flex justify-center">Comprar</button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))
            }
        {error && <p>{error}</p>}
    </div>
  );
};

export default ProductDetails;

//Preciso colocar a busca da API no componente pai para nao dar problema na hora do header buscar sobre o produto
//Provavelmente vou ter que transferir o return para o ProductCard
//Depois ver de colocar um slider e filtros
