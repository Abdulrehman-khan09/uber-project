import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className=' bg-cover bg-center bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn3I6xJS9tVp-NS7RVSpGfaKGeIW1ilfGcnQ&s)]  h-screen flex justify-between flex-col w-full'> 
           <h1 className='font-bold text-3xl p-3'>Uber</h1>
             <div className=' py-5 px-10  bg-white flex flex-col justify-center items-center '>
                <h1 className='font-bold text-2xl  capitalize'>get started with uber</h1>
                <Link to='/user-login' className='text-white w-full font-semibold p-3 mt-5 text-center bg-black'>Continue</Link>
             </div>
        </div>
    </div>
  )
}

export default Home
 