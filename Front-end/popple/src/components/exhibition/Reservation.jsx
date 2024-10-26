export default function Reservation({ data }) {
  console.log("모달", data);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-5 w-[50%] h-[40%]">
        {data}
      </div>
    </div>
  );
};
