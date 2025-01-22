import '../styles/global.css';
import Image from 'next/image';
import Link from 'next/link';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#27AE60] to-[#219652]">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-4">
                <div className="flex justify-end items-center">
                    <h1 className="text-white text-5xl font-bold">جاهز؟</h1>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Left Side Content */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
                            Connecting People with Great Food
                        </h2>
                        <p className="text-white text-xl mb-12 opacity-90">
                            Choose your journey in the world of delicious experiences
                        </p>
                        
                        {/* Buttons Container */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                            <Link href="/restaurant_main">
                                <button className="bg-white w-full sm:w-auto bg-transparent text-[#27AE60] px-12 py-4 rounded-xl font-semibold text-lg border-2 border-white hover:bg-[#27AE60] hover:text-white transform hover:-translate-y-1 transition duration-300 flex items-center justify-center">
                                    <span>Join as Restaurant</span>
                                </button>
                            </Link>
                            
                            <Link href="/client_main">
                                <button className="bg-white w-full sm:w-auto bg-transparent text-[#27AE60] px-12 py-4 rounded-xl font-semibold text-lg border-2 border-white hover:bg-[#27AE60] hover:text-white transform hover:-translate-y-1 transition duration-300 flex items-center justify-center">
                                    <span>Join as Client</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side Image */}
                    <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                        <div className="relative w-[500px] h-[500px]">
                            <Image 
                                src="/images/hero-food.png" 
                                alt="Food Delivery"
                                layout="fill"
                                objectFit="contain"
                                className="animate-float"
                            />
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-lg">
                        <h3 className="text-white text-xl font-semibold mb-4">Fast Delivery</h3>
                        <p className="text-white opacity-80">Quick and reliable food delivery to your doorstep</p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-lg">
                        <h3 className="text-white text-xl font-semibold mb-4">Quality Food</h3>
                        <p className="text-white opacity-80">Partner with the best restaurants in your area</p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-lg">
                        <h3 className="text-white text-xl font-semibold mb-4">Best Deals</h3>
                        <p className="text-white opacity-80">Great offers and discounts on your favorite meals</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

