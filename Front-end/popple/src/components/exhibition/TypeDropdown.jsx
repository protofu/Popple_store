export default function TypeDropdown({onChange}) {
  return(
    <select className="border rounded-lg ml-2" onChange={onChange}>
      <option>팝업</option>
      <option>전시</option>
    </select>
  )
}