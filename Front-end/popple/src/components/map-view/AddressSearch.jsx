import { useState } from 'react';
import { searchAddress } from '../../api/services/KakaoAPI';

export default function AddressSearch () {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const searchResults = await searchAddress(query);
    setResults(searchResults);
    console.log(searchResults[0].x);
    console.log(searchResults[0].y);
  };

  return (
    <div>
      <h1>주소 검색</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색할 주소 입력"
      />
      <button onClick={handleSearch}>검색</button>

      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <p>{result.address_name}</p>
            {result.road_address && <p>도로명 주소: {result.road_address.address_name}</p>}
            <p>좌표: ({result.x}, {result.y})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

