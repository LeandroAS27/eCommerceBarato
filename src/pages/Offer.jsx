import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
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
        navigate(`/checkout`)
    }

    if(!product) return <div>Carregando...</div>

    return(
        <div className="w-2/4 flex flex-col mx-auto items-center mt-8">
            <Header/>
            <div className="flex w-full justify-center items-start mt-14">
                <img src={product.thumbnail} alt={product.title} className="w-60 h-60 object-contain border mr-4"/>
                <div className="flex flex-col text-center w-1/2">
                    <h1 className="font-bold text-xl mb-2">{product.title}</h1>
                    <p className="mb-2">{product.description}</p>
                    <p className="font-semibold mb-2">R${product.price}</p>
                    <button 
                    onClick={handleClickBuy}
                    className="py-1.5 px-2 bg-blue-700 hover:bg-blue-600 w-2/4 mx-auto">Adicionar ao carrinho</button>
                </div>
            </div>
                <div className="flex flex-col w-full mt-8">
                    <h2 className="text-xl font-bold mt-8">Reviews</h2>
                    <div>
                        {product.reviews.map((review, index) => (
                            <p key={index}>{review.reviewerName} : {review.comment}</p>
                        ))}
                    </div>
                </div>
        </div>
    )
}

export default Offer;