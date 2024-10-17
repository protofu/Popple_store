import PropTypes from 'prop-types';

export const CustomInput = ({ 
  id,
  type = 'text', 
  name,
  placeholder = '', 
  className = '' ,
  defaultValue = '',
  ...rest
}) => {
  const inputStyle = "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${inputStyle} ${className}`}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};


CustomInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.string
};