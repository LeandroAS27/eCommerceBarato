import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
    const navigate = useNavigate()

    const handleBuyClick = () => {
        navigate(`/offer/${product.id}`);
    };
    
    return(
        <motion.div  
            className="border p-4 text-center flex flex-col justify-between max-w-xs mx-auto"
            initial={{opacity:0, scale: 0.5}}
            animate={{opacity:1, scale: 1}}
            transition={{duration: 0.5}}>
            <img src={product.thumbnail} alt={product.title} className="w-full h-32 object-contain mb-4" />
            <h2 className="font-bold text-xl mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="font-semibold text-left">R${product.price}</p>
            <button 
            onClick={() => handleBuyClick(product.id)}
            className="py-1.5 px-2 bg-indigo-500 hover:bg-blue-700 w-24 rounded flex justify-center">Comprar</button>
        </motion.div>
    )
}

export default ProductCard;