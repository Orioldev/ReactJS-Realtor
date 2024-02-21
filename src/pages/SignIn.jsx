import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { OAuth } from '../components/OAuth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';




export const SignIn = () => {

  const [ showPassword, setshowPassword ] = useState(false)
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const onChange = ({ target }) => {
    setFormData( ( prevState ) =>  ({
      ...prevState,
      [target.id]: target.value,
    }))
  }

  const navigate = useNavigate();

  const onSubmit = async ( e ) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword( auth, email, password );
      if ( userCredentials.user ) {
        toast.success('The Sign In is success!!');
        navigate('/');
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img 
            className='w-full rounded-2xl'
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="keys" 
          />
        </div>

        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-10'>
          <form onSubmit={ onSubmit }>
            <input 
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
              type="email" 
              id='email' 
              value={ email } 
              onChange={ onChange } 
              placeholder='email@example.com'
            />

            <div className='relative mb-6'>
              <input 
                type={ showPassword ? 'text' : 'password' }
                id='password' 
                value={ password } 
                onChange={ onChange } 
                placeholder='password'
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
              />

              {
                showPassword ? 
                ( <AiFillEyeInvisible 
                    className='absolute right-3 top-3 text-xl cursor-pointer' 
                    onClick={ () => setshowPassword((prevState) => !prevState ) } 
                /> ) 
                : ( 
                  <AiFillEye 
                    className='absolute right-3 top-3 text-xl cursor-pointer' 
                    onClick={ () => setshowPassword((prevState) => !prevState ) } />
                  )
              }
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6' >Don't have a account?
                <Link 
                  to='/sign-up' 
                  className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'> Register </Link>
              </p>
              <p>
                <Link 
                  to='/forgot-password' 
                  className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot Password?</Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 
                      text-white px-7 py-3 text-sm 
                      font-medium uppercase rounded 
                      shadow-md hover:bg-blue-700 
                      transition duration-300 ease-in-out hover:shadow-lg
                      active:bg-blue-800' 
              type="submit"> 
                      
              Sign in

            </button>

            <div className='flex my-4 before:border-t before:flex-1 
                  items-center before:border-gray-300  
                  after:border-t after:flex-1  
                  after:border-gray-300'
            >
              <p className='text-center font-semibold mx-4'> OR </p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
