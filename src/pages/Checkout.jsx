import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import CartSummary from "../components/CartSummary";
import {motion} from 'framer-motion'

const Checkout = () => {
    return(
        <motion.div
        className="bg-gray-100 h-dvh w-full flex flex-col mx-auto items-center"
        initial={{opacity:0, scale: 0.5}}
        animate={{opacity:1, scale: 1}}
        transition={{duration: 0.5}}>
            <header className="flex justify-center mt-8">
                <Header/>
            </header>
            <main className="flex flex-col items-center md:flex-row">
                <section className="mt-8 w-full md:w-1/2 p-4">
                    <h1 className="font-bold text-xl">Pagamento</h1>
                    <form>
                            <input 
                            className="w-full py-2 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 mt-4"
                            type="text" 
                            placeholder="Numero do cartao"
                            required
                            />
                            <input 
                            className="w-full py-2 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text" 
                            placeholder="Nome impresso" 
                            required
                            />
                        <div className="flex space-x-4">
                            <div className="w-full">
                                <input 
                                className="w-5/12 py-2 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
                                type="month" 
                                required/>
                                <input 
                                className="w-2/4 py-2 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                                type="number" 
                                placeholder="CVV" 
                                required 
                                minLength='3' 
                                maxLength='4' 
                                />
                            </div>
                        </div>
                        <button 
                        className="w-full py-1.5 px-2 bg-blue-300 text-white">Pagar Agora</button>
                    </form>
                </section> 

                <div className="hidden md:block border-r-2 border-slate-700 mx-4 flex-grow h-auto">&nbsp;</div>

                <CartSummary/>
            </main>
        </motion.div>
    )
}

export default Checkout;