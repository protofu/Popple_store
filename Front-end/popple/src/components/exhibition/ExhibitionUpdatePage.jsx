
import { useEffect, useState } from "react";
import { exhibitionAPI } from "../../api/services/Exhibition";
export default function ExhibitionUpdatePage() {
  const exId = 2572;
  const [exhiData, setExhiData] = useState({});

  const handleGet = async() => {
    try {
      const res = await exhibitionAPI.get(exId);
      if(res.status === 200){
        const {
          exhibitionName,
          subTitle,
          free,
          fee,
          startAt,
          endAt,
          detailDescription,
          poster,
          address,
          detailAddress,
          homepageLink,
          instagramLink,
          notice,
          reserve,
          image,
          terms,
        } = res.data;
        setExhiData({
          exhibitionName: exhibitionName,
          subTitle: subTitle,
          free: free,
          fee: fee,
          startAt: startAt,
          endAt: endAt,
          detailDescription: detailDescription,
          poster: poster,
          address: address,
          detailAddress: detailAddress,
          homepageLink: homepageLink,
          instagramLink: instagramLink,
          notice: notice,
          reserve: reserve,
          image: image,
          terms: terms,
        });
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    if (Object.keys(exhiData).length > 0) {
      setInfo((prev) => ({
        ...prev,
        ...exhiData, // 가져온 데이터를 info에 반영
      }));
    }
  }, [exhiData]);

  const [info, setInfo] = useState({
    exhibitionName: "",
          subTitle: "",
          free: "" , 
          fee: false,
          startAt: "",
          endAt: "",
          detailDescription: "",
          poster: "",
          address: "",
          detailAddress: "",
          homepageLink: "",
          instagramLink: "",
          notice: "",
          reserve: false,
          image:[],
          terms: ""
  });
  const changeInformation = (e) => {
    const { name, type } = e.target;
    let { value } = e.target;
    const keys = name.split(".");

    if (name === "endAt" || name === "startAt") {
      const startAt = new Date(info.startAt);
      const endAt = new Date(name === "endAt" ? value : info.endAt);

      if (endAt < startAt) {
        alert("종료일은 시작일보다 빠를 수 없습니다.");
        return;
      }
    }
    if (keys.length === 1) {
      setInfo({
        ...info,
        [name]: value,
      });
    } else if (keys.length === 2) {
      setInfo({
        ...info,
        [keys[0]]: {
          ...info[keys[0]],
          [keys[1]]: value,
        },
      });
    } else if (keys.length === 3) {
      setInfo({
        ...info,
        [keys[0]]: {
          ...info[keys[0]],
          [keys[1]]: {
            ...info[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        },
      });
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-5 mt-16 w-5/6 h-full">
        </div>
      </div>
    </>
  );
}
