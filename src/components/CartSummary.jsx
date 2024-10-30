import { useLocation } from "react-router-dom";
import Header from "./Header";

const CartSummary = () => {
    const location = useLocation()
    const {data} = location.state || {};


    return(
        <section className="w-full md:w-1/2 p-4 text-center">
            <h2 className="font-bold text-xl">Resumo da compra</h2>
                {data && data.length > 0 ? ( // Verifique se data existe e tem elementos
                    data.map(product => (
                        <div key={product.id} className="flex justify-between my-2">
                            <p>{product.title}</p>
                            <p>{product.quantity}x</p>
                            <p>{(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto adicionado.</p> // Mensagem alternativa se data estiver vazio
                )}
                    <p className="text-center">Total: R${data.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
        </section>
    )
}

export default CartSummary;