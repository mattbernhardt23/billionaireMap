import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch } from 'react-redux'
import { login } from '@features/auth/authSlice'
import { Button } from "@components/ui/common"
import { useRouter } from 'next/router'
import { reset } from '@features/auth/authSlice'


export default function Login () {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {email, password} = formData

    const dispatch = useDispatch()
    const router = useRouter()

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message) 
        }

        if(isSuccess || user){
            // router.push('/')
        }

        dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message, router, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const onClick =(e) => {
        e.preventDefault()

        console.log("handling the submit")
        const userData = {
            email,
            password
        }
        
        dispatch(login(userData))
        router.push('/')
    }

    // if (isLoading) {
    //     return <Spinner />
    // }

  return (
    <>
        <section>
            <div className='flex flex-col items-center py-12'>

            <h1 className='py-4 text-3xl font-bold tracking-widest text-gray-700'>
                Login
            </h1>
            <p className='py-4 text-xl font-bold tracking-widest text-red-500'>
                Please Login
            </p>
            </div>
        </section>
        <section>
            <div className='flex flex-col items-center'>
                <form>
                <div className='border-black'>
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
                <div className="my-8" >
                    <input 
                        type="text"
                        id='password'
                        value={password}
                        name='password'
                        onChange={onChange}
                        placeholder="Enter Your Password"
                        required    
                        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 text-xl block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
                    />
                </div>
                <div className="flex justify-center mb-8">
                    <Button
                        variant="lightGray"
                        onClick={onClick}
                    >
                        Submit
                    </Button>
                </div>
                </form>
            </div>
        </section>
    </>
    
  )
}

{/* <form>
<div>
    <input 
        type="text"
        id='email'
        // value={email}
        name='email'
        // onChange={onChange}
        placeholder="Enter Your Email"
        required    
    />
</div>
<div>
    <input 
        type="text"
        id='password'
        // value={password}
        name='password'
        // onChange={onChange}
        placeholder="Enter Your Password"
        required    
    />
</div>
<div>
    <button
        // onSubmit={onSubmit}
    >
        Submit
    </button>
</div>
</form> */}
