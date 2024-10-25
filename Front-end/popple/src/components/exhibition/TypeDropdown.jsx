export default function TypeDropdown({onChange, className}) {
  return(
    <select className="border rounded-lg ml-2" onChange={onChange} className={className} >
      <option value={1}>팝업</option>
      <option value={2}>전시</option>
    </select>
  )
}