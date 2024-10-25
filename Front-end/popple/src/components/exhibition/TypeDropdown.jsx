export default function TypeDropdown({onChange}) {
  return(
    <select onChange={onChange}>
      <option>팝업</option>
      <option>전시</option>
    </select>
  )
}