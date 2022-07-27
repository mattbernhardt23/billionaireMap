import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className="header">
        <div className="logo">
            <Link to='/'>
                {/* We need to find an Icon, Currently, this is just a shitty link */}
                Back to Map
            </Link>
        </div>
        <ul>
            {user ? (
                <li>
                    <button
                        onClick={onLogout}
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            ) : ( 
            <>
            <li>
                <Link to='/login'>
                    Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    Register
                </Link>
            </li>
            </>
            )}  
        </ul>
    </header>
  )
}

export default Header