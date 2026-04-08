import bamilekeImage from '../assets/Bamiléké.jpg';
import bamunImage from '../assets/bamun.png';
import fefeImage from '../assets/fefe.jpg';
import ghomalaImage from '../assets/ghomla.jpg';
import medumbaImage from '../assets/medumba.jpg';
import ndandaImage from "../assets/Nda'nda'.png";
import ngombaleImage from '../assets/Ngombale.png';
import yembaImage from '../assets/yemba.jpg';

const languageImageMap = {
  ghomala: ghomalaImage,
  ghomla: ghomalaImage,
  yemba: yembaImage,
  medumba: medumbaImage,
  "fe'fe": fefeImage,
  fefe: fefeImage,
  ngombale: ngombaleImage,
  bamun: bamunImage,
  "nda'nda'": ndandaImage,
  bamiléké: bamilekeImage,
  bamileke: bamilekeImage,
};

export function getLanguageImage(language) {
  const candidates = [language?.name, language?.village_name]
    .filter(Boolean)
    .map((value) => String(value).trim().toLowerCase());

  for (const key of candidates) {
    if (languageImageMap[key]) {
      return languageImageMap[key];
    }
  }

  return (
    language?.image_url ||
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  );
}
