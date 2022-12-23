import { Modal, Button } from "@components/ui/common"
import { CommentList, CommentCard } from "@components/ui/comments"
import { useSelector, useDispatch } from "react-redux"
import { createComment, searchBillionairesByCountry } from "@features/billionaires/billionaireSlice"
import { useState } from "react"
import { toast } from "react-toastify";
import Image from "next/image"




export default function PopupModal({modalIsOpen, onClose, billionaire}) {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const defaultState = {
    body: "",
    user,
    billionaire
  }
  
  const [commentData, setCommentData] = useState(defaultState)
  const { body } = commentData

  
  const onChange = (e) => {
    setCommentData((prevState) => ({
        ...prevState,
    [e.target.name]: e.target.value,
    }))
  }

  const onClick =(e) => {
    e.preventDefault()

    const commentData = {
        body,
        user,
        billionaire
    }

    if(body === '') {
      return toast.error("Cannot Submit Empty Comment")
    } else if (user === null) {
      return toast.error("Must Be Logged In to Submit Comment")
    }
    
    dispatch(createComment(commentData))
    .unwrap()
    .then(() => {
      toast.success("Comment Submitted")
    })
    setCommentData(defaultState)
    dispatch(searchBillionairesByCountry(billionaire.country))
}

  const closeModal = () => {
      onClose()
  }

  const commentState = createComment(commentData)


if(modalIsOpen && billionaire != null){

  const netWorth = billionaire.finalWorth / 1000
  
return (
      <>
        <Modal modalIsOpen={modalIsOpen}>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-auto shadow-xl transform transition-all sm:my-2 sm:align-middle sm:w-4/5">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="flex flex-row mb-4">
                    <div className="flex flex-col content-between">
                      <div className="w-56" >
                        <Button
                          className="shadow-md"
                          variant="red"
                          onClick={() => {
                            closeModal()
                          }}  
                        >
                          Back to Results
                        </Button>
                      </div>
                      <div className="mt-6">
                        {billionaire.person.imageExists ? 
                              <Image
                                className="rounded-md shadow-md"
                                src={billionaire.squareImage.startsWith("https") 
                                    ? billionaire.squareImage 
                                    :`https://${billionaire.squareImage}`
                                  }
                                alt={"billionaireImage"}
                                height={3000}
                                width={250}
                              />
                              :
                              <Image
                                className="rounded-md shadow-md backdrop-grayscale"
                                src={"/NoImage.png"}
                                alt={"noImage"}
                                height={3000}
                                width={250}
                              />
  
                        }      
                      </div>
                    </div>
                    <div className={`w-${200} flex flex-col justify-between ml-4 gap-2`}> 
                      <div className="flex">
                          <h3 className="text-3xl font-bold leading-6 text-red-900" id="modal-title">
                            {billionaire.person.name}
                          </h3>
                      </div>
                      <div className="flex flex-row justify-between"> 
                          <div>
                            <span className="text-xl font-bold leading-6 text-red-800">Net Worth - </span>
                            <span className="text-xl font-bold leading-6 text-red-800">{`$${netWorth} Billion`}</span>
                          </div>
                          <div className="text-xl font-bold leading-6 text-red-800">
                            {`Age - ${billionaire.age}`}
                          </div>
                      </div>
                      <div className="text-lg tracking-wide font-bold leading-6 text-red-800 flex flex-row justify-between"> 
                        <div>{billionaire.category.toUpperCase()}</div>
                        <div>-</div>
                        <div>{billionaire.source.toUpperCase()}</div>
                      </div>
                      <div className="flex flex-col"> 
                          <div className="flex flex-row  justify-between text-lg font-bold leading-6 text-red-800">
                            <div>Bio</div>
                            <div>{`${billionaire.city}, ${billionaire.state || billionaire.country}`}</div>
                          </div>
                          <div className="mt-2 shadow-md border rounded-md border-red-100">
                            <div className="overflow-y-auto h-32 text-md leading-6 text-red-800 m-1">
                              {billionaire.bios.map((item, i) => 
                                <p key={billionaire.bios[i]}>- {item}</p>
                              )}
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full"> 
                    <div className="flex flex-row w-full relative">
                        <input 
                          type="text"
                          id='body'
                          value={body}
                          name='body'
                          onChange={onChange}
                          placeholder="Enter Your Comment"
                          required
                          className="
                          text-base text-gray-500
                          border-gray-500
                          focus:ring-indigo-500
                          focus:border-indigo-500 block p-3 sm:text-sm  rounded-md mr-2
                          w-full"    
                        />
                        <Button
                          disabled={commentState.isDisabled}
                          className=" absolute-right"
                          variant="lightGray"
                          onClick={onClick}
                        >
                          Submit
                        </Button>
                    </div>
                    <div className="flex"> 
                    <CommentList
                      comments={billionaire.comments}
                    >
                    {comment => {
                      return (
                        <CommentCard
                          key={comment._id}    
                          comment={comment}
                          billionaire={billionaire}
                      />
                    )}}
                    </CommentList>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>        
        </Modal>
      </>
    )
  }
}