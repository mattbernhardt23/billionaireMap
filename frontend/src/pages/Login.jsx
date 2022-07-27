import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import {login} from '../features/auth/authSlice'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message) 
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const onSubmit =(e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))

    }

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section>
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Please Login</p>
        </section>
        <section>
            <form>
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
                    <button
                        onSubmit={onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
    
  )
}

export default Login