import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout, reset} from '../../features/auth/authSlice'
import { Button } from "@components/ui/common"

  
function User() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <div className='flex space-x-3 mr-4' >
            {user ? (
                <div>
                    <Button 
                        onClick={onLogout}
                    >
                        <FaSignOutAlt />
                    </Button>
                </div>
            ) : ( 
            <>
            <div >
                <Link to='/login'>
                    <FaSignInAlt />
                </Link>
            </div>
            <div>
                <Link to='/register'>
                    <FaUser />
                </Link>
            </div>
            </>
            )}  
        
    </div>
  )
}

export default Header