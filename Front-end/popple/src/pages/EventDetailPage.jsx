import { eventAPI } from "../api/services/Event"

export default function EventDetailPage(){

  const getEvent = async () => {
    try {
      const res = await eventAPI.getEvent();
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  return(
    <>
    <div>이곳은 이벤트 상세 페이지</div>
    </>
  )
}