import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { likeAPI } from "../../../src/api/services/Like";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function LikeList(params) {
  const [likeList, setLikeList] = useState([]);
  const [reloadLikeList, setReloadLikeList] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getLikeList = async () => {
      try {
        const response = await likeAPI.getMyLikeList();
        console.log(response.data);
        setLikeList(response.data);
      } catch (error) {
        console.error("실패", error);
      }
    };

    getLikeList();
  }, [reloadLikeList]);

  const handleUnlike = async (exhibitionId) => {
    try {
      await likeAPI.unlike(exhibitionId);
      setReloadLikeList(prev => !prev);
    } catch (error) {
      console.error("좋아요 취소 실패:", error);
    }
  };

  const handleCardClick = (exhibitionId) => {
    navigate(`/pop-up/detail/${exhibitionId}`); // 상세 페이지로 이동
  };

  return (
    <div className="flex flex-wrap mx-[10px] gap-6">
      {likeList.map(item => (
        <div 
          key={item.exhi.id} 
          className="flex-shrink-0 w-[calc(19%-10px)] my-3 border border-[#ccc] 
                      rounded-lg overflow-hidden text-center shadow-md transition-transform 
                      duration-200 transform hover:scale-105 flex flex-col"
          onClick={() => handleCardClick(item.exhi.id)}
        >
          <div className="flex justify-center items-center m-2">
            <img 
              src={`http://localhost:8080/poster/${item.posterSavedName}`}
              alt={item.exhi.exhibitionName} 
              className="aspect-[2.5/3] w-[160px] h-auto object-cover" 
            />
          </div>
          <div className="flex flex-col items-center mx-2 h-full">
            <div className="flex flex-col items-center pb-3 text-lg font-bold mt-2 h-full">
              <h3 className="mr-5 text-[14px]">{item.exhi.exhibitionName}</h3>
              <div className="flex justify-end w-full items-end h-full">
                <FaHeart className="text-red-500 text-[20px] cursor-pointer transition-transform duration-200 hover:scale-150"
                  onClick={(e) => {
                  e.stopPropagation(); // 디테일이동 X
                  handleUnlike(item.exhi.id);}}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
