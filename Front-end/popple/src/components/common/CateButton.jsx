import PropTypes from "prop-types";

export default function CateButton({ text }) {
  return (
    <div className="border-2 border-[#EC4382] rounded-[1rem] aspect-[3/1] w-[2.5rem] h-auto inline px-2 text-[#EC4382] font-semibold text-[0.75rem]">
      {text}
    </div>
  );
};

// PropTypes 설정
CateButton.propTypes = {
  text: PropTypes.string.isRequired,
};