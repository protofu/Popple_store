import Vibrant from "node-vibrant";

export default function useVibrant(img) {
  let paletteData = null;
  function corsProxy(url) {
    return `${url}`;
  }

  async function submit(imgUrl) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = corsProxy(imgUrl);
    console.log(image);
    paletteData = await Vibrant.from(image).getPalette();
  }

  return paletteData;
}



