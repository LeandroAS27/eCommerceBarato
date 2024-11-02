import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {motion} from 'framer-motion'

const Offer = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data)
                console.log(response.data)
            } catch (error) {
                console.log('Erro ao buscar o produto', error);
            }
        }
        fetchProduct()
    }, [id])
    

    const handleClickBuy = () => {
        console.log(product)
        if(product){
            const newProduct ={
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                quantity: quantity,
            };
            console.log('Dados mapeados:', newProduct)
            
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            
            const existingProductIndex = existingCart.findIndex(item => item.id === newProduct.id);

            if(existingProductIndex !== -1){
                existingCart[existingProductIndex].quantity += newProduct.quantity;
            }else{
                existingCart.push(newProduct)
            }

            localStorage.setItem('cart', JSON.stringify(existingCart))

            navigate(`/checkout`, {state: {data: existingCart}})
        }else{
            console.log('Nenhum produto no carrinho.')
        }
        
    }

    if(!product) return <div>Carregando...</div>

    

    return(
        <motion.div className="w-full flex flex-col mx-auto items-center bg-gray-100 h-dvh"
        initial={{opacity:0, scale: 0.5}}
        animate={{opacity:1, scale: 1}}
        transition={{duration: 0.5}}>
            <header className="mt-8">
                <Header/>
            </header>
            <main className="flex w-full flex-col sm:w-3/4 lg:w-2/3 md:flex-row justify-center items-center mt-14">
                <section className="flex flex-col md:flex-row justify-center items-center w-full">
                    <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="w-80 h-80 sm:w-60 sm:h-60 md:mb-0 md:mr-4 object-contain border mr-4"/>
                    <div className="flex flex-col text-center w-full md:w-1/2 md:text-left">
                        <h1 className="font-bold text-xl mb-2">{product.title}</h1>
                        <p className="mb-2">{product.description}</p>
                        <p className="font-semibold mb-2 text-lg sm:text-xl">R$ {product.price}</p>
                        <section className='flex w-3/4 justify-evenly items-center mt-4'>
                            <button 
                            onClick={handleClickBuy}
                            className="py-1.5 px-2 bg-blue-700 hover:bg-blue-600 w-2/4 mx-auto text-white">Comprar</button>
                            <button 
                            className="py-1.5 px-1 bg-blue-700 hover:bg-blue-600 w-1/4 mx-auto text-white"
                            onClick={() => setQuantity(prev => prev+ 1)}>Adicionar</button>
                            <p className='font-bold text-center'>x{quantity}</p>
                        </section>
                    </div>
                </section>
            </main>
                <section className="flex flex-col w-2/4 mt-8">
                    <h2 className="text-xl font-bold my-8 ml-6">Reviews</h2>
                    <div className="flex flex-col items-start sm:items-start justify-start ml-6">
                    {product && product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <p className="font-bold">{review.reviewerName}</p>
                            <p>{review.comment}</p>
                        </div>
                        ))
                    ) : (
                        <p className="text-red-500">Sem avaliações disponíveis</p>
                    )}
                    </div>
                </section>
        </motion.div>
    )
}

export default Offer;