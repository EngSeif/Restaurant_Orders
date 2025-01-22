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
                <div className="w-[60%] h-full bg-[#27AE60] flex justify-center items-center">
                    <div className="w-[60%]">
                        <h4 className="text-xl">Sign Up</h4>
                        <h2 className="text-3xl py-4 font-semibold">New Account</h2>
                        <form className="flex gap-4 flex-col justify-start">
                            <div className='flex gap-4'>
                                <div className='flex-col flex w-[40%] justify-between h-[150px]'>
                                    <label>First Name</label>
                                    <label>Last Name</label>
                                    <label>Email</label>
                                    <label>Password</label>
                                </div>
                                <div className="flex-col flex w-[60%] gap-2 justify-between h-[150px]">
                                    <div className="border-b-2">
                                        <input
                                            type="text"
                                            className="w-full focus:border-none bg-transparent focus:outline-none placeholder-white"
                                            placeholder="Enter Your First Name"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="border-b-2">
                                        <input
                                            type="text"
                                            className="w-full focus:border-none bg-transparent focus:outline-none placeholder-white"
                                            placeholder="Enter Your Last Name"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="border-b-2">
                                        <input
                                            type="email"
                                            className="w-full focus:border-none border-b-2 bg-transparent focus:outline-none placeholder-white"
                                            placeholder="Enter Your Email"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="border-b-2">
                                        <input
                                            type="password"
                                            className="w-full focus:border-none border-b-2 bg-transparent focus:outline-none placeholder-white"
                                            placeholder="Enter Your Password"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="submit"
                                className="bg-white text-[#27AE60] rounded-lg py-1 my-3 cursor-pointer font-semibold border-solid border-white border-2 hover:bg-transparent hover:text-white duration-100"
                            />
                            <p className="mx-auto">Do You Have An Account? Sign In</p>
                        </form>
                    </div>
                </div>
                <div className="w-[40%] flex justify-center items-center">
                    <Image src='/images/signUp.png' width={700} height={700} className='animate-bounceOnce infinite delay-1000' />
                </div>
            </div>
        </>
    )
}

export default Login;
