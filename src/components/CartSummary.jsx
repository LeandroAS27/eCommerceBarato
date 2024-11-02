import { useLocation } from "react-router-dom";
import Header from "./Header";
import {motion} from 'framer-motion'

const CartSummary = () => {
    const location = useLocation()
    const {data} = location.state || {};


    return(
        <motion.section className="w-full md:w-1/2 p-4 text-center"
            initial={{opacity:0, scale: 0.5}}
            animate={{opacity:1, scale: 1}}
            transition={{duration: 0.5}}>
            <h2 className="font-bold text-xl">Resumo da compra</h2>
                {data && data.length > 0 ? ( // Verifique se data existe e tem elementos
                    data.map(product => (
                        <div key={product.id} className="flex justify-between my-4 sm:my-2">
                            <p className="flex-1 text-left">{product.title}</p>
                            <p className="w-16 text-center">{product.quantity}x</p>
                            <p className="w-20 text-right">{(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto adicionado.</p> // Mensagem alternativa se data estiver vazio
                )}
                    <p className="text-center font-semibold text-xl">Total: R${data.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        </motion.section>
    )
}

export default CartSummary;