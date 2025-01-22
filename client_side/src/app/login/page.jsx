import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAt,
    faKey
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/global.css';
import Image from 'next/image';


function Login() {
    return (
        <>
            <div className="w-full h-screen flex text-white">
                <div className="w-[40%] flex justify-center items-center">
                    <Image src='/images/login.png' width={500} height={500} className='animate-bounceOnce infinite delay-300' />
                </div>
                <div className="w-[60%] h-full bg-[#27AE60] flex justify-center items-center">
                    <div className="w-[60%]">
                        <h4 className="text-xl">Login</h4>
                        <h2 className="text-3xl py-4 font-semibold">Your Account</h2>
                        <form className="flex flex-col gap-3 justify-start">
                            <div className="flex items-center gap-3 border-b-2 py-2">
                                <FontAwesomeIcon icon={faAt} />
                                <input
                                    type="email"
                                    className="grow focus:border-none bg-transparent focus:outline-none placeholder-white"
                                    placeholder="Enter Your Email"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex items-center gap-3 border-b-2 py-2">
                                <FontAwesomeIcon icon={faKey} />
                                <input
                                    type="password"
                                    className="grow focus:border-none bg-transparent focus:outline-none placeholder-white"
                                    placeholder="Enter Your Password"
                                    autoComplete="off"
                                />
                            </div>
                            <input
                                type="submit"
                                className="bg-white text-[#27AE60] rounded-lg py-1 my-3 cursor-pointer font-semibold border-solid border-white border-2 hover:bg-transparent hover:text-white duration-100"
                            />
                            <p className="mx-auto">Don't You Have An Account ? Sign Up</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login