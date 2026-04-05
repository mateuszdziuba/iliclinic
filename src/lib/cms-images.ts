import type { ImageMetadata } from 'astro';

import image006d56 from '../assets/cms/006d56a1-144d-496c-9438-8f498887e170.jpg';
import imageEfccc from '../assets/cms/efcccdfb0fe88e85c148250ceb022c12.jpg';
import imageImg5017 from '../assets/cms/IMG_5017-edited-scaled.jpg';
import imageIli3 from '../assets/cms/Ili-3.jpg';
import imageKwas from '../assets/cms/kwas_hialuronowy.jpg';
import imageOferta from '../assets/cms/oferta.png';
import imageProblem1 from '../assets/cms/Problemy-skory-glowy-i-wlosow1.png';
import imageProblem2 from '../assets/cms/Problemy-skory-glowy-i-wlosow2-300x300.png';
import imageProjekt from '../assets/cms/Projekt-bez-nazwy1-300x300.jpg';
import imagePruszkow from '../assets/cms/pruszkow-1.jpeg';
import imageZdjecieZabiegu from '../assets/cms/zdjecie_zabiegu_16_1.jpg';
import heroClinic from '../assets/hero-clinic.jpg';
import heroOstroleka from '../assets/IMG_7809.jpg';

const cmsImages: Record<string, ImageMetadata> = {
  '/images/006d56a1-144d-496c-9438-8f498887e170.jpg': image006d56,
  '/images/efcccdfb0fe88e85c148250ceb022c12.jpg': imageEfccc,
  '/images/hero-clinic.jpg': heroClinic,
  '/images/IMG_5017-edited-scaled.jpg': imageImg5017,
  '/images/IMG_7809.jpg': heroOstroleka,
  '/images/Ili-3.jpg': imageIli3,
  '/images/kwas_hialuronowy.jpg': imageKwas,
  '/images/oferta.png': imageOferta,
  '/images/Problemy-skory-glowy-i-wlosow1.png': imageProblem1,
  '/images/Problemy-skory-glowy-i-wlosow2-300x300.png': imageProblem2,
  '/images/Projekt-bez-nazwy1-300x300.jpg': imageProjekt,
  '/images/pruszkow-1.jpeg': imagePruszkow,
  '/images/zdjecie_zabiegu_16_1.jpg': imageZdjecieZabiegu,
};

export function resolveCmsImage(src?: string | null): ImageMetadata | undefined {
  if (!src) return undefined;

  return cmsImages[src];
}
