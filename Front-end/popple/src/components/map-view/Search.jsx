import { useState } from "react";

export default function Search() {
  const [searchResult, setSearchResult] = useState([
    {
      id: 0,
      title: "돈돈즈 잠실 롯데월드몰 팝업스토어",
      location: "서울특별시 송파구",
      date: "2024-10-01 ~ 2024-10-31"
    },
    {
      id: 1,
      title: "꼬마마법사 레미 X 팝퍼블 콜라보 팝업",
      location: "서울특별시 서대문구",
      date: "2024-10-01 ~ 2024-10-20"
    },
    {
      id: 2,
      title: "골든볼 팝업스토어",
      location: "서울특별시 영등포구",
      date: "2024-10-01 ~ 2024-10-22"
    },
    {
      id: 3,
      title: "24년 짱구는 못말려 부산 팝업스토어 <짱구는 여행중!>",
      location: "부산광역시 해운대구",
      date: "2024-10-01 ~ 2024-10-10"
    },
  ]);

  const [query, setQuery] = useState("");

  // 검색어에 따라 필터링된 결과 반환
  const filteredResults = searchResult.filter((item) =>
    `${item.title} ${item.location}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        placeholder="검색"
      />

      <ul className="border border-gray-300 rounded-lg">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <li
              key={item.id}
              className="p-4 border-b border-gray-200 last:border-none"
            >
              <div className="font-semibold">{item.title}</div>
              <div className="text-gray-500">{item.location}</div>
              <div className="text-gray-400 text-sm">{item.date}</div>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">검색 결과가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
