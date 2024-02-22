import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const Profile = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  }

  const onChange = (e) => {
    setFormData(( prevState ) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  const onSubmit = async () => {
    try {
      if ( auth.currentUser.displayName !== name ) {
        // actualizar el displayName en Firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // actualizar el nombre en Firestore
        const docRef = doc( db, "users", auth.currentUser.uid );
        await updateDoc( docRef,  {
          name,
        });

      }
      toast.success('Profile details updated');
    } catch (error) {
      toast.error('Could not update the profile details')
    }
  }

  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name Input */}

            <input 
              type="text" 
              id="name" 
              value={ name } 
              disabled={ !changeDetail } 
              onChange={ onChange }
              className={`mb-6 w-full px-4 py-2 
                        text-xl text-gray-700 
                        bg-white border-gray-300 rounded 
                        transition ease-in-out ${ changeDetail && 'bg-red-200 focus:bg-red-200' }`}
            />

            {/* Email input */}
            <input 
              type="email" 
              id="email" 
              value={ email } 
              disabled
              className='mb-6 w-full px-4 py-2 
                        text-xl text-gray-700 
                        bg-white border-gray-300 rounded 
                        transition ease-in-out'
            />

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p className='flex items-center'>Dou yoy want to change your name?
                <span className='text-red-600 hover:text-red-700 
                                transition ease-in-out duration-200 
                                ml-1 cursor-pointer'
                                onClick={ () => {
                                  changeDetail && onSubmit();
                                  setChangeDetail( (prevState) => !prevState );
                                }}
                > 
                { changeDetail ? 'Apply change' : 'Edit' }
                </span>
              </p>
              <p className='bg-red-600 px-3 py-2 rounded
                      text-white hover:text-blue-100
                        transition duration-200 ease-in-out 
                        cursor-pointer'
                        onClick={ onLogout }
              >
                Sign Out
              </p>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}
