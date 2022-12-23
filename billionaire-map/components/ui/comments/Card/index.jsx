import { Button } from "@components/ui/common"
import { useDispatch, useSelector } from "react-redux"
import { deleteComment } from "@features/billionaires/billionaireSlice"
import { toast } from "react-toastify";




export default function Card({billionaire, comment}) {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const commentData ={
        commentId: comment._id,
        id: billionaire._id
    }
    
    const handleClick = (e) => {
        e.preventDefault()
        

        dispatch(deleteComment(commentData))
        .unwrap()
        .then(() => {
            toast.success("Comment Deleted")
        })
    }

  return (
    <>
        <div className="flex flex-row justify-between p-1 mx-1 border-b-2 border-gray-500" >  
            <div className="flex flex-col px-2">
                <div className="text-sm font-semibold text-red-900">
                    {comment.name}
                </div>
                <div className="text-xs text-red-900">
                    {comment.body}
                </div>
            </div>
            <div className="flex items-center">
            {comment.name === user?.name &&
                <Button
                    variant="delete"
                    size="sm"
                    onClick={handleClick}
                >
                    Delete
                </Button>
            }
            </div>
        </div>
    </>
  )
      
}
