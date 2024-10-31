import PropTypes from "prop-types";

export default function CateButton({ text, color }) {
  return (
    <div className="border-2 border-popple-light rounded-[1rem] aspect-[3/1] w-[2.5rem] h-auto inline px-2 text-popple-light font-semibold text-[1rem]">
      {text}
    </div>
  );
};
