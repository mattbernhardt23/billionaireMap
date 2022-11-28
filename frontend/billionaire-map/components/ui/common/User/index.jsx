
import Link from "next/link"
import {useDispatch, useSelector} from 'react-redux'
import {logout, reset} from '@features/auth/authService'
import { Button } from '@components/ui/common'
import { useRouter } from "next/router"


export default function User () {
    const router = useRouter()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        router.push('/')
    }

    return (
        <div className='flex space-x-2 mr-4' >
             {/* true should be user */}
                {user ? (
                    <div>
                        <Button 
                            onClick={onLogout}
                        >
                            Sign Out
                        </Button>
                    </div>
                ) : ( 
                <>
                <div >
                    <Link href='/login' legacyBehavior>
                        <Button
                            variant='gray'
                        >
                            Sign In  
                        </Button>
                    </Link>
                </div>
                <div>
                    <Link href='/register' legacyBehavior>
                        <Button
                            variant='gray'
                        >
                           Register 
                        </Button>
                    </Link>
                </div>
                </>
                )}  
        </div>
      )
}


















// import Link from "next/link"
// // import {useDispatch, useSelector} from 'react-redux'
// // import {logout, reset} from '../../features/auth/authSlice'
// import { Button, RegisterModal, SignInModal } from '@components/ui/common'

// export default function User () {
//     // const navigate = useNavigate()
//     // const dispatch = useDispatch()
//     // const {user} = useSelector((state) => state.auth)

//     // const onLogout = () => {
//     //     dispatch(logout())
//     //     dispatch(reset())
//     //     navigate('/')
//     // }

//     return (
//         <div className='flex space-x-2 mr-4' >
//              {/* true should be user */}
//                 {false ? (
//                     <div>
//                         <Button 
//                             // onClick={onLogout}
//                         >
//                             Sign Out
//                         </Button>
//                     </div>
//                 ) : ( 
//                 <>
//                 <div >
//                     <Link href='/login' legacyBehavior>
//                         <Button
//                             variant='gray'
//                         >
//                             Sign In  
//                         </Button>
//                     </Link>
//                 </div>
//                 <div>
//                     <Link href='/register' legacyBehavior>
//                         <Button
//                             variant='gray'
//                         >
//                            Register 
//                         </Button>
//                     </Link>
//                 </div>
//                 </>
//                 )}  
            
//         </div>
//       )
// }