import Header from "../components/Header";
import ProductDetails from "../components/ProductDetails";

const Home = () => {
    
    return(
        <>
            <div className="w-full h-full flex flex-col items-center pt-14 bg-gradient-to-b from-green-500 to-blue-500">
                <header>
                    <Header/>
                </header>
                <main className="w-full flex justify-center mt-8">
                    <ProductDetails/>
                </main>
            </div>
        </>
    )
}

export default Home;