export default function CustomSubmitButton({ text, style, onClick }) {
  return (
    <div className={`
      flex justify-center items-center 
      bg-popple rounded-[0.7rem] 
      text-[#f5f5f5] text-[15px]
      cursor-pointer hover:bg-popple-dark
      w-fit h-auto px-5 py-1 mx-auto ${style}`}
      onClick={onClick}
      >
      {text}
    </div>
  );
};
