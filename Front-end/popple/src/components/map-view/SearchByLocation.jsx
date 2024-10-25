import { useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import { searchAddress } from '../../api/services/KakaoAPI';

export default function SearchByLocation({ handleClick }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // boolean으로 변경
  const inputStyle =
    "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";

  const handleChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // 공백일때 리스트 끄기
    if (!newQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const searchResults = await searchAddress(newQuery);
      // 결과가 있다면 리스트 열기
      if (searchResults) {
        setResults(searchResults);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Failed to fetch address data:", error);
    }
  };

  const handleBtnClick = () => {
    handleClick(results[0]);
    setShowResults(false);
  };

  const handleResultClick = (result) => {
    handleClick(result);
    setShowResults(false);
  };


  return (
    <div className="flex flex-col items-center">
      <h1 className="m-3 ml-10 text-[1.4rem] font-bold w-full">검색</h1>
      <div className={`${inputStyle} mx-auto flex focus-within:border-popple-light focus-within:border-2`}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="검색할 주소 입력"
          className="w-full border-none focus:outline-none"
        />
        <FaSearchLocation className="text-[#6b6b6b] m-auto cursor-pointer" onClick={handleBtnClick} />
      </div>
      {showResults && (
        <ul className="relative block left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-[300px] mx-auto max-h-[200px] overflow-y-auto">
          {results.map((result, index) => (
            <li
              key={index}
              className="border-b p-2 cursor-pointer hover:bg-gray-200 last:border-b-0"
              onClick={() => handleResultClick(result)}
            >
              <p>{result.address_name}</p>
              {result.road_address && <p>도로명 주소: {result.road_address.address_name}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
