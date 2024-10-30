import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
            
            const updateCart = [...existingCart, newProduct];
            
            localStorage.setItem('cart', JSON.stringify(updateCart))
            navigate(`/checkout`, {state: {data: updateCart}})
        }else{
            console.log('Nenhum produto no carrinho.')
        }
        
    }

    if(!product) return <div>Carregando...</div>

    

    return(
        <div className="w-2/4 flex flex-col mx-auto items-center mt-8">
            <header>
                <Header/>
            </header>
            <main className="flex w-full justify-center items-start mt-14">
                <section className="flex">
                    <img src={product.thumbnail} alt={product.title} className="w-60 h-60 object-contain border mr-4"/>
                    <div className="flex flex-col text-center w-1/2">
                        <h1 className="font-bold text-xl mb-2">{product.title}</h1>
                        <p className="mb-2">{product.description}</p>
                        <p className="font-semibold mb-2">R$ {product.price}</p>
                        <section className='flex w-full justify-evenly items-center'>
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
                <section className="flex flex-col w-full mt-8">
                    <h2 className="text-xl font-bold mt-8">Reviews</h2>
                    <div>
                    {product && product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                        <p key={index}>{review.reviewerName} : {review.comment}</p>
                        ))
                    ) : (
                        <p>Sem avaliações disponíveis</p>
                    )}
                    </div>
                </section>
        </div>
    )
}

export default Offer;