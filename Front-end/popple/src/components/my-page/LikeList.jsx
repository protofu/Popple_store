import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { likeAPI } from "../../../src/api/services/Like";

export default function LikeList(params) {
  const [likeList, setLikeList] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const LikeList = async () => {
  //     try {
  //       const response = await likeAPI.getMyLikeList();
  //       console.log(response.data);
  //       setLikeList(response.data);
  //     } catch (error) {
  //       console.error("실패", error);
  //     }
  //   };

  //   LikeList();
  // }, []);

  //ex
  useEffect(() => {
    const exampleData = [
      {
        exhibitionId: 1,
        exhibitionName: "전시 제목 1",
        posterName: "/src/assets/img1.png"
      },
      {
        exhibitionId: 2,
        exhibitionName: "전시 제목 2",
        posterName: "/src/assets/img1.png"
      },
      {
        exhibitionId: 3,
        exhibitionName: "전시 제목 3",
        posterName: "/src/assets/img1.png"
      },
      {
        exhibitionId: 4,
        exhibitionName: "전시 제목 4",
        posterName: "/src/assets/img1.png"
      },
      {
        exhibitionId: 5,
        exhibitionName: "전시 제목 1",
        posterName: "/src/assets/img2.png"
      },
      {
        exhibitionId: 6,
        exhibitionName: "전시 제목 2",
        posterName: "/src/assets/img3.png"
      },
      {
        exhibitionId: 7,
        exhibitionName: "전시 제목 3",
        posterName: "/src/assets/img4.png"
      },
      {
        exhibitionId: 8,
        exhibitionName: "전시 제목 4",
        posterName: "poster4.jpg"
      }
    ];

    setLikeList(exampleData);
  }, []);
  
  const handleUnlike = async (exhibitionId) => {
    try {
      await likeAPI.unlike(exhibitionId);
      setLikeList(prevList => prevList.filter(item => item.exhibitionId !== exhibitionId));
    } catch (error) {
      console.error("좋아요 취소 실패:", error);
    }
  };

  const handleCardClick = (exhibitionId) => {
    navigate(`/pop-up/detail/${exhibitionId}`); // 상세 페이지로 이동
  };

  return (
    <div className="flex flex-wrap justify-center mx-[10px] ">
      {likeList.map(item => (
        <div 
          key={item.exhibitionId} 
          className="flex-shrink-0 w-[calc(17%-10px)] m-[24px] mb-5 border border-[#ccc] 
                      rounded-lg overflow-hidden text-center shadow-md transition-transform 
                      duration-200 transform hover:scale-105"
          onClick={() => handleCardClick(item.exhibitionId)} // 카드 클릭 이벤트 추가
        >
          <div className="flex justify-center items-center h-[20vh] m-3">
            <img 
              src={item.posterName}
              alt={item.exhibitionName} 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
          <div className="flex justify-center items-center pb-3 text-lg font-bold">
            <h3 className="mr-5">{item.exhibitionName}</h3>
            <span 
              className="text-xl cursor-pointer transition-transform duration-200 hover:scale-125" 
              onClick={(e) => {
                e.stopPropagation(); // 디테일이동 X
                handleUnlike(item.exhibitionId);
              }}
            >
              ❤️
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
