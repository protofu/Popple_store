// kakaoAPI.js
export const searchAddress = async (query) => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${REST_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch address data');
  }

  const data = await response.json();
  return data.documents;  // 결과에서 documents 리스트만 반환
};
