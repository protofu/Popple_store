import PropTypes from "prop-types";

export default function CateButton({ text }) {
  return (
    <div className="border-2 border-[#EC4382] rounded-[1rem] aspect-[3/1] w-[5rem] h-auto flex justify-center items-center text-[#EC4382] font-semibold text-[1.25rem]">
      {text}
    </div>
  );
};

// PropTypes 설정
CateButton.propTypes = {
  text: PropTypes.string.isRequired,
};