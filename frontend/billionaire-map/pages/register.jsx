import {useState, useEffect} from 'react'
import { Button } from "@components/ui/common"
import {toast} from "react-toastify"
import {useSelector, useDispatch } from 'react-redux'
import {register, reset} from '@features/auth/authSlice'
import { useRouter } from 'next/router'


export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const router = useRouter()
    

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    // useEffect(() => {
    //     if(isError) {
    //         toast.error(message) 
    //     }

    //     if(isSuccess || user){
    //         navigate('/')
    //     }

    //     dispatch(reset())
    // }, [user, isLoading, isError, isSuccess, message])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const onClick = (e) => {
        e.preventDefault()

        if(password !== password2){
            toast.error('Passwords Do Not Match')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
            router.push('/')
        }
    } 

    // if(isLoading) {
    //     return <Spinner />
    // }

  return (
    <>
        <section>
        <div className='flex flex-col items-center py-12'>
            <h1 className='py-4 text-3xl font-bold tracking-widest text-gray-700'>
                Register
            </h1>
            <p className='py-4 text-xl font-bold tracking-widest text-red-500'>
                Please Create an Account
            </p>
        </div>
        </section>
        <section>
            <div className='flex flex-col items-center'>
            <div>
                    <input 
                        type="text"
                        id='name'
                        value={name}
                        name='name'
                        onChange={onChange}
                        placeholder="Enter Your Name"
                        required 
                        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"     
                    />
                </div>
                <div className="my-8">
                    <input 
                        type="text"
                        id='email'
                        value={email}
                        name='email'
                        onChange={onChange}
                        placeholder="Enter Your Email"
                        required   
                        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"   
                    />
                </div>
                <div className="my-8">
                    <input 
                        type="text"
                        id='password'
                        value={password}
                        name='password'
                        onChange={onChange}
                        placeholder="Enter Your Password"
                        required    
                        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"  
                    />
                </div>
                <div className="my-8">
                    <input 
                        type="text"
                        id='password2'
                        value={password2}
                        name='password2'
                        onChange={onChange}
                        placeholder="Please Confirm Your Password"
                        required   
                        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"   
                    />
                </div>
                <div className="my-8">
                <div className="flex justify-center mb-8">
                    <Button
                        variant="lightGray"
                        onClick={onClick}
                    >
                        Submit
                    </Button>
                </div>
                </div>
            </div>
        </section>
    </>
    
  )
}

