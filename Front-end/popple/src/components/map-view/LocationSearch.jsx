import { useEffect, useState } from "react";

export default function LocationSearch({ onSearch, locations }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Update results whenever locations change
  useEffect(() => {
    if (locations) {
      setResults(locations);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [locations]);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // Call onSearch every time the input changes to get updated results
    if (newQuery.trim() !== '') {
      onSearch(newQuery); // Fetch results based on the current input
    } else {
      setResults([]); // Clear results if input is empty
    }
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  const handleLocationClick = (placeName) => {
    onSearch(placeName); // Use the clicked place name to search
    setShowResults(true);
  };

  const inputStyle =
    "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-3 ml-10 text-[1.4rem] font-bold w-full">이름으로 찾기</h1>
      <div className={`${inputStyle} mx-auto flex focus-within:border-popple-light focus-within:border-2`}>
        <input
          type="text"
          value={query}
          onChange={handleChange} // Trigger search on input change
          placeholder="검색할 주소 입력"
          className="w-full border-none focus:outline-none"
        />
        <button onClick={handleSearch} className="text-[#6b6b6b] m-auto">
          🔍
        </button>
      </div>
      <ul className="relative block left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-[300px] mx-auto max-h-[200px] overflow-y-auto">
        {showResults ? (
          results.map((place, index) => (
            <li 
              key={index} 
              className="border-2 p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleLocationClick(place.place_name)} // Click to select place
            >
              {place.place_name}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">결과 없음</li> // No results found
        )}
      </ul>
    </div>
  );
}
