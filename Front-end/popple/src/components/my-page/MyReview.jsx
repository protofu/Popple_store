import React, { useEffect, useState } from "react"; 
import { reviewAPI } from "../../api/services/Review";
import ReviewItem from "../review/ReviewItem";
import { MdEdit, MdDelete } from "react-icons/md";
import { authAPI } from "../../api/services/Auth";

export default function MyReview() {
  const [reviews, setReviews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(()=>{
    const getMyReview = async () =>{
      try{
        const res= await reviewAPI.getMyReviewList();
        setReviews(res.data);
      } catch(error){
        console.log("리뷰 목록 불러오기 실패",error);
      }
    };
    getMyReview();
  },[]);



  // 수정관련
  // const handleEdit = (id) => {
  //   const review = reviews.find(r => r.id === id);
  //   setReviewToEdit(review);
  //   setUpdatedContent(review.content);
  //   setShowEditModal(true);
  // };

  // const confirmEdit = async () => {
  //   try {
  //     const updatedReview = { ...reviewToEdit, content: updatedContent };
  //     await reviewAPI.modifyReview(reviewToEdit.id, updatedReview);
  //     setReviews(reviews.map(review => 
  //       review.id === reviewToEdit.id ? updatedReview : review
  //     ));
  //     alert("성공적으로 수정되었습니다.");
  //     setShowEditModal(false);
  //   } catch (error) {
  //     console.log("리뷰 수정 실패", error);
  //   }
  // };

  // const EditModal = () => {
  //   const handleCancel = () => {
  //     setShowEditModal(false);
  //   };

  //   return (
  //     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
  //       <div className="flex flex-col justify-center items-center bg-white rounded-xl p-5 w-[50%] h-auto gap-5 border-2 border-[#8900E1] relative">
  //         <button className="absolute top-2 right-2 text-[#8900E1] text-xl p-2" onClick={handleCancel}>
  //           ✖
  //         </button>
          
  //         <h1 className="text-[20px] text-center mt-8 mb-4">리뷰를 수정하시겠습니까?</h1>
          
  //         <div className="flex flex-col w-full mb-4">
  //           <label className="mb-2" htmlFor="image">
  //             리뷰 사진
  //           </label>
  //           <input 
  //             type="file"
  //             accept="image/*"
  //             onChange={(e) => setUpdatedImage(e.target.files[0])}
  //             className="border border-gray-300 rounded p-2 w-full"
  //           />
  //         </div>
    
  //         <div className="flex flex-col w-full mb-4">
  //           <label className="mb-2" htmlFor="content">
  //             리뷰 내용
  //           </label>
  //           <textarea 
  //             id="content"
  //             className="border border-gray-300 rounded p-2 w-full h-[100px]"
  //             value={updatedContent}
  //             onChange={(e) => setUpdatedContent(e.target.value)}
  //           />
  //         </div>
          
  //         <div className="flex justify-center w-full">
  //           <button 
  //             className="bg-[#8900E1] text-white px-4 py-2 mt-5 rounded" 
  //             onClick={confirmEdit}
  //           >
  //             수정
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
    
  // };

  const handleDelete = async (id) => {
    const requestData = { password }; 
    try {
      const res = await authAPI.checkPassword(requestData);
      if (res.status === 200) {
        await authAPI.deleteReview(id);
        alert("성공적으로 삭제되었습니다.");
        setReviews(reviews.filter(review => review.id !== id));
        setShowDeleteModal(false);
      }
    } catch (error) {
      setErrorMessage("비밀번호가 틀렸습니다.");
      console.log("리뷰 삭제 실패", error);
    }
  };

  const DeleteModal = () => {
    const handleCancel = () => {
      setShowDeleteModal(false);
      setErrorMessage("");
    };

    const handleConfirm = () => {
      handleDelete(reviewIdToDelete);
    };

    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="flex flex-col justify-center items-center bg-white rounded-xl p-5 w-[400px] h-[300px] gap-5 border-2 border-[#8900E1] relative">
          <button className="absolute top-2 right-2 text-[#8900E1] text-xl p-2" onClick={handleCancel}>
            ✖
          </button>
          <h1 className="text-[20px] text-center">리뷰를 삭제하시겠습니까?</h1>
          <h1 className="text-[20px] text-center">계정 비밀번호를 입력해주세요.</h1>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none w-full p-2"
          />
          {errorMessage && (
            <p className="text-red-500 text-xs text-right">{errorMessage}</p>
          )}
          <div className="flex justify-center w-full">
            <button 
              className="bg-red-500 text-white px-4 py-2 mt-5 rounded" 
              onClick={handleConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div 
            key={review.id} 
            className="border border-[#000000] rounded-[0.4rem] mb-2 flex items-center justify-between"
          >
            <ReviewItem review={review} style={'border-none w-full'} />
            <div className="flex mr-5 ml-0 pl-0">
              {/* <button 
                onClick={() => handleEdit(review.id)} 
              >
                <MdEdit className="text-2xl mr-3 transition-transform duration-200 hover:scale-125" />
              </button> */}
              <button 
                onClick={() => {
                  //delete 모달창
                  setReviewIdToDelete(review.id);
                  setShowDeleteModal(true);
                }} 

              >
                <MdDelete className="text-2xl mr-1 transition-transform duration-200 hover:scale-125" />
              </button>
            </div>
          </div>
        ))
      ) : (
        "작성된 리뷰가 없습니다."
      )}
       {showDeleteModal && <DeleteModal />}
      {/* {showEditModal && <EditModal />} */}
    </div>
  );
};