'use client'
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Login() {

    const router = useRouter();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [activeError, setActiveError] = useState(false);

    const HandleChangeFirstName = (e) => {
        setFirstname(e.target.value);
    }

    const HandleChangeLastName = (e) => {
        setLastname(e.target.value);
    }

    const HandleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const HandleChangePassword = (e) => {
        setpassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://172.21.27.133:3500/api/auth/client/signup',
                {
                    firstname,
                    lastname,
                    email,
                    password
                }
            );
            console.log('Response Status:', response.status);
            router.push(`/login/client`);
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
    }

    return (
        <>
            <div className="w-full h-screen flex text-white">
                <div className="w-[60%] h-full bg-[#27AE60] flex justify-center items-center">
                    <div className="w-[60%]">
                        <h4 className="text-xl">Sign Up</h4>
                        <h2 className="text-3xl py-4 font-semibold">New Account</h2>
                        <form onSubmit={handleSubmit} className="flex gap-4 flex-col justify-start">
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
                                            value={firstname || ""}
                                            onChange={HandleChangeFirstName}
                                            className="w-full focus:border-none bg-transparent focus:outline-none placeholder-white"
                                            placeholder="Enter Your First Name"
                                        />
                                    </div>
                                    <div className="border-b-2">
                                        <input
                                            type="text"
                                            value={lastname || ""}
                                            onChange={HandleChangeLastName}
                                            className="w-full focus:border-none bg-transparent focus:outline-none placeholder-white"
                                            placeholder="Enter Your Last Name"
                                        />
                                    </div>
                                    <div className="border-b-2">
                                        <input
                                            type="email"
                                            value={email || ""}
                                            onChange={HandleChangeEmail}
                                            className="w-full focus:border-none border-b-2 bg-transparent focus:outline-none placeholder-white"
                                            placeholder="Enter Your Email"
                                        />
                                    </div>
                                    <div className="border-b-2">
                                        <input
                                            type="password"
                                            value={password || ""}
                                            onChange={HandleChangePassword}
                                            className="w-full focus:border-none border-b-2 bg-transparent focus:outline-none placeholder-white"
                                            placeholder="Enter Your Password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="submit"
                                className="bg-white text-[#27AE60] rounded-lg py-1 my-3 cursor-pointer font-semibold border-solid border-white border-2 hover:bg-transparent hover:text-white duration-100"
                            />
                            {activeError === true && <p className='text-red-400 mx-auto font-bold'>Email is Already found</p>}
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
