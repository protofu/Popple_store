import { useEffect, useState } from "react";
import CustomSubmitButton from "../common/CustomSubmitButton";
import ReviewItem from "./ReviewItem";
import WriteReviewModal from "./WriteReview";
import { reviewAPI } from "../../api/services/Review";
import { useNavigate, useParams } from "react-router-dom";
import {useLoginStore} from "../../stores/LoginState";
import LoginPromptModal from "../LoginPromptModal";
import { poppleAlert } from "../../utils/PoppleAlert";

export default function ReviewInDetail({isVisited}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState(null);
  const { id } = useParams("id");
  const [reviewReload, setReviewReload] = useState(false);
  
  // 로그인 안 한 사용자가 리뷰작성하려할때 -> 아직 방문인증이 없어서 추가함
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const isLogIn = useLoginStore(state => state.isLoggedIn);
  const navigate = useNavigate();
  const openModal = () => {
    if(isLogIn){
      setIsModalOpen(true)
    }else{
      setIsLoginPromptOpen(true);
    }
  };
  const closeLoginPrompt = () => {
    setIsLoginPromptOpen(false);
  };
  const goToLoginPage = () => {
    navigate("/login");
    setIsLoginPromptOpen(false);
  };

  //const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setReviewReload(prev => !prev);
    setIsModalOpen(false);
  }
 
  

  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await reviewAPI.getReviewList(id);
        setReviews(res.data);
      } catch (error) {
        await poppleAlert.alert("", "리뷰를 불러오는 중 오류가 발생했습니다.");
        console.error("오류 발생:" + error);
      }
    };

    getReview();
  }, [id, reviewReload]);

  const h1Style = "font-bold text-[1.25rem]";

  return (
    <div className="flex flex-col gap-8 mb-[2rem] mx-12 mt-12">
      <div>
        <h1 className={h1Style}>주의사항</h1>
        <p className="m-6 text-[14px]">게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다. <br />
        사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 POPPLE 리뷰 작성 권한이 제한됩니다.</p>
      </div>
      <div>
        <div className="grid grid-cols-[2fr_4fr_2fr] border-b-2 mb-3 p-1">
          <h1 className="font-bold">총 {reviews?.length}개의 리뷰가 있습니다.</h1>
          <h5 className="text-right text-[12px] text-[#a4a4a4] pt-2"><span className="text-[#D36A6A] mr-1">*</span>리뷰는 방문인증이 완료되면 작성할 수 있습니다.</h5>
          { isVisited && <CustomSubmitButton text={"리뷰 작성하기"} onClick={openModal} />}
          <WriteReviewModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        {reviews !== null ? (
          reviews.map((review) => <ReviewItem key={review.id} review={review} />)
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>
      {/* 로그인 안 한 사용자가 리뷰작성하려할때 */}
      <LoginPromptModal 
        isOpen={isLoginPromptOpen} 
        onClose={closeLoginPrompt} 
        onConfirm={goToLoginPage}
      />
    </div>
  );
};
