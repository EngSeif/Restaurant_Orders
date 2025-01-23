'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAt,
    faKey
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


function Login() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [activeError, setActiveError] = useState(false)

    const HandleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const HandleChangePassword = (e) => {
        setpassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3500/api/auth/restaurant/login',
                {
                    email,
                    password,
                }
            );
            console.log('Response Status:', response.status);
            console.log(response.data)
            const restaurantId = response.data.restaurant.id
            router.push(`/restaurant/${restaurantId}`);
        } catch (error) {
            // Handle Axios errors
            if (error.response) {
                setActiveError(true)
            } else if (error.request) {
                // The request was made, but no response was received
                console.log('No Response Received:', error.request);
            } else {
                // An error occurred in setting up the request
                console.log('Error in Login:', error.message);
            }
        }
    };


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
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-start">
                            <div className="flex items-center gap-3 border-b-2 py-2">
                                <FontAwesomeIcon icon={faAt} />
                                <input
                                    type="email"
                                    value={email || ""}
                                    onChange={HandleChangeEmail}
                                    className="grow focus:border-none bg-transparent focus:outline-none placeholder-white"
                                    placeholder="Enter Your Email"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex items-center gap-3 border-b-2 py-2">
                                <FontAwesomeIcon icon={faKey} />
                                <input
                                    type="password"
                                    onChange={HandleChangePassword}
                                    value={password || ""}
                                    className="grow focus:border-none bg-transparent focus:outline-none placeholder-white"
                                    placeholder="Enter Your Password"
                                    autoComplete="off"
                                />
                            </div>
                            <input
                                type="submit"
                                className="bg-white text-[#27AE60] rounded-lg py-1 my-3 cursor-pointer font-semibold border-solid border-white border-2 hover:bg-transparent hover:text-white duration-100"
                            />
                            {activeError === true && <p className='text-red-400 mx-auto font-bold'>Data is Not Right</p>}
                            <p className="mx-auto">Don't You Have An Account ? <a href='/signUp'> Sign Up </a></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login