export default function TypeDropdown({onChange, className}) {
  return(
    <select className={`${className}`} onChange={onChange}  >
      <option value={1}>팝업</option>
      <option value={2}>전시</option>
    </select>
  )
}