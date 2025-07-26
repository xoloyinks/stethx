"use client"
import React, { useState } from 'react'
import "swiper/css/navigation";
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-cards';
import swiper_1 from "@/public/images/med1.jpg"
import swiper_2 from "@/public/images/med2.jpg"
import swiper_3 from "@/public/images/med3.jpg"
import swiper_4 from "@/public/images/med4.jpg"
import swiper_5 from "@/public/images/med5.jpg"
import swiper_6 from "@/public/images/med6.jpg"
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay } from 'swiper/modules'
import Image, { StaticImageData } from 'next/image';
import { ImSpinner2 } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'

export default function Auth() {
    const [formDetails, setFormDetails] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false)

    const effectImages = [
        swiper_1,
        swiper_2,
        swiper_3,
        swiper_4,
        swiper_5,
        swiper_6
    ]

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormDetails({
            ...formDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
       try {
        const res = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDetails),
        });

        const data = await res.json();

        if (!res.ok) {
          setLoading(false)
          toast.error('Login failed!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                return;
        }

        Cookies.set("token", data.data.token, {
          expires: 1
        })
        toast.success('Login Successful', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
        window.location.href = '/'
      } catch (error) {
        console.error('Login error:', error);
        // TODO: Handle error (e.g., show error message to user)
        throw error; // or handle differently based on your needs
      } finally {
        setLoading(false)
      }
    }

  return (
    <section className='w-screen h-screen overflow-x-hidden'>
        <ToastContainer />
         <div className='absolute w-full h-full overflow-x-hidden'>
            <Swiper
                      spaceBetween={30}
                      modules={[EffectFade, Autoplay]} 
                      slidesPerView={1}
                      effect={"fade"}
                      speed={1500}
                      autoplay= {{
                          delay: 10000,
                          disableOnInteraction: false,
                      }}
                      className='absolute overflow-hidden z-10 max-lg:h-full max-lg:min-w-[1200px] max-lg:hidden lg:h-full lg:min-w-[1300px] lg:w-screen lg:overflow-hidden'
                      >
                      {effectImages.map((el : StaticImageData, i : number) => {
                          return <SwiperSlide key={i} className="lg:w-screen lg:overflow-x-hidden w-screen overflow-hidden"><Image
                           src={el} fill alt={`Slide ${i} `}  className="object-cover" /></SwiperSlide>;
                      })}
              </Swiper>
        </div>

        <div className='w-screen h-screen bg-black/80 absolute z-50 flex justify-evenly items-center px-5 sm:px-20 overflow-hidden '>

            <div>
                <div className='w-full sm:w-1/2 max-lg:hidden text-white'>
                        <p className=" min-[300px]:text-[4rem] w-fit text-[3rem] font-bold sm:text-[8rem] leading-[4rem] sm:leading-[7rem] bg-gradient-to-r from-teal-400 via-sky-500 to-indigo-500 bg-clip-text py-3 text-transparent ">StethX</p>
                        <p className='mt-3'>For Diabetes care...</p>
                </div>
            </div>
                <div className='w-full lg:w-[35%] p-5 sm:p-10 max-sm:text-white text-white sm:bg-gray-900 rounded-xl'>
                    <h2 className='font-semibold text-2xl sm:hidden sm:mb-5 bg-gradient-to-r from-teal-400 via-sky-500 to-indigo-500 bg-clip-text py-3 text-transparent'>
                        StethX
                    </h2>
                    <h2 className='text-5xl font-black'>Sign in</h2>
                    <form method='POST' onSubmit={handleSubmit} className='mt-10' >
                        <div className='flex flex-col mt-5 text-black text-sm space-y-2'>
                                <label htmlFor="email" className='text-white'>Email</label>
                                <input value={formDetails.email} onChange={handleChange} name='email' type="email" className='p-2 rounded border-2 text-white border-gray-500 focus:outline-indigo-200' />
                            </div>
                            <div className='flex flex-col mt-5 space-y-2  text-sm'>
                                <label htmlFor="email" className='text-white'>Password</label>
                                <input value={formDetails.password} type="password" onChange={handleChange} name='password' className='p-2 rounded border-gray-500  border-2 focus:outline-indigo-200 text-white' />
                            </div>

                            <button disabled={loading}  className='bg-gradient-to-br from-teal-400 via-sky-500 to-indigo-500 rounded text-center text-white py-2 w-full mt-10 sm:mt-10 hover:opacity-60 cursor-pointer'>
                                { loading ? <ImSpinner2 className='animate-spin text-2xl mx-auto' /> : "Sign in" }
                            </button>
                    </form>
                </div>
        </div>
    </section>
  )
}
