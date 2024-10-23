export default function Dropdown({onChange}) {
  return(
    <select onChange={onChange}>
      <option>금융</option>
      <option>부동산</option>
      <option>농업</option>
      <option>제조</option>
      <option>의료</option>
      <option>교육</option>
      <option>국방</option>
      <option>행정</option>
      <option>외교</option>
      <option>숙박</option>
    </select>
  )
}