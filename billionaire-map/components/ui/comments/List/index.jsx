import { Children } from "react"
import { CommentHeader } from "@components/ui/comments"

export default function List({comments, children}) {
     
    return (
        <>
      <div className={`w-full mt-4 border-2 h-200 rounded-md border-gray-600`}>
        <div>
          <CommentHeader />
        </div>
        <div className='overflow-y-auto h-24'>
            { comments.map(comment => children(comment))}
        </div>
      </div>
    </>
    )
  }