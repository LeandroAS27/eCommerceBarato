import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import axios from 'axios'
import { SearchContext } from "../context/SearchContext";
import ProductCard from "./ProductCard";

const ProductDetails = () => {
    const [loading, setLoading] = useState(true);
    const { searchTerm, offers, setOffers } = useContext(SearchContext);
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

        if(offers.length > 0 ){
            const data = offers.map(offer => ({
                id: offer.id,
                title: offer.title,
                description: offer.description,
                price: offer.price
            }));
        }

        
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
                                <ProductCard key={offer.id} product={offer}/>
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
