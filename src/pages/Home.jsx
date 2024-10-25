import Header from "../components/Header";
import ProductDetails from "../components/ProductDetails";

const Home = () => {
    
    return(
        <>
            <div className="w-full h-screen flex flex-col items-center mt-14">
                <Header/>
                <div className="w-full flex justify-center mt-8">
                    <ProductDetails/>
                </div>
            </div>
        </>
    )
}

export default Home;