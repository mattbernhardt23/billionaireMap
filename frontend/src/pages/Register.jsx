import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch } from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message) 
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
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
        }
    } 

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please Create an Account</p>
        </section>
        <section>
            <form onSubmit={onSubmit}>
            <div>
                    <input 
                        type="text"
                        id='name'
                        value={name}
                        name='name'
                        onChange={onChange}
                        placeholder="Enter Your Name"
                        required    
                    />
                </div>
                <div>
                    <input 
                        type="text"
                        id='email'
                        value={email}
                        name='email'
                        onChange={onChange}
                        placeholder="Enter Your Email"
                        required    
                    />
                </div>
                <div>
                    <input 
                        type="text"
                        id='password'
                        value={password}
                        name='password'
                        onChange={onChange}
                        placeholder="Enter Your Password"
                        required    
                    />
                </div>
                <div>
                    <input 
                        type="text"
                        id='password2'
                        value={password2}
                        name='password2'
                        onChange={onChange}
                        placeholder="Please Confirm Your Password"
                        required    
                    />
                </div>
                <div>
                    <button
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
    
  )
}

export default Register