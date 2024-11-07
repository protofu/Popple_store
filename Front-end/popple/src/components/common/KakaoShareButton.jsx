import { useEffect } from "react";

export default function KakaoShareButton({ data }) {

  
  const resultUrl = window.location.href;
  // const resultUrl = "https://www.naver.com";

  useEffect(() => {
    const loadKakaoSDK = () => {
      return new Promise((resolve, reject) => {
        if (window.Kakao && window.Kakao.isInitialized()) {
          resolve(); // 초기화 완료
        } else {
          window.Kakao.init(import.meta.env.VITE_KAKAO_CLIENT_ID);
          console.log("Kakao SDK가 초기화되었습니다."); // 초기화 성공 메시지
          resolve(); // 초기화 완료
        }
      });
    };

    loadKakaoSDK()
      .catch((error) => {
        console.error("Kakao SDK 초기화 중 오류 발생:", error);
      });
  }, []);

  const shareKaKao = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: data.exhibitionName,
        description: data.detailDescription,
        // 공유 이미지 파일로 변경
        imageUrl: "https://blog.kakaocdn.net/dn/bWT0MZ/btrTQBmvgx8/ZLe4zZNsqXMga0B7G3JcR0/img.png",
        link: {
          mobileWebUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: resultUrl,
          },
        },
      ],
    });
  };

  const handleShare = () => {
    const title = "공유할 제목"; // 공유할 제목
    const contents = "공유할 내용"; // 공유할 내용
    shareKaKao(title, contents); // 공유 함수 호출
  };

  return (
    <div className="cursor-pointer" onClick={handleShare}>
      <img src="/icons/kakao_share.png" alt="카카오 공유하기 버튼" />
    </div>
  );
}
