import type { ImageMetadata } from 'astro';

import imageBotox from '../assets/cms/botox-treatment.jpg';
import imageFounderPortrait from '../assets/cms/clinic-founder-portrait.jpg';
import imageClinicInterior from '../assets/cms/clinic-interior.jpg';
import imageDermapen from '../assets/cms/dermapen-treatment.png';
import imageEarPiercing from '../assets/cms/ear-piercing-treatment.jpg';
import imageHyaluronicAcid from '../assets/cms/hyaluronic-acid-treatment.jpg';
import imageLaserHairRemoval from '../assets/cms/laser-hair-removal-treatment.jpg';
import imageRoyalLift from '../assets/cms/royal-lift-treatment.jpg';
import imageSkinTightening from '../assets/cms/skin-tightening-treatment.jpg';
import imageTreatmentRoom from '../assets/cms/treatment-room.jpg';
import imageTrichology from '../assets/cms/trichology-treatment.jpg';
import heroOstroleka from '../assets/ostroleka-clinic-hero.jpg';
import heroClinic from '../assets/pruszkow-clinic-hero.jpg';

const cmsImages: Record<string, ImageMetadata> = {
  '/images/laser-hair-removal-treatment.jpg': imageLaserHairRemoval,
  '/images/ear-piercing-treatment.jpg': imageEarPiercing,
  '/images/pruszkow-clinic-hero.jpg': heroClinic,
  '/images/skin-tightening-treatment.jpg': imageSkinTightening,
  '/images/ostroleka-clinic-hero.jpg': heroOstroleka,
  '/images/clinic-founder-portrait.jpg': imageFounderPortrait,
  '/images/hyaluronic-acid-treatment.jpg': imageHyaluronicAcid,
  '/images/clinic-interior.png': imageClinicInterior,
  '/images/trichology-treatment.png': imageTrichology,
  '/images/dermapen-treatment.png': imageDermapen,
  '/images/royal-lift-treatment.jpg': imageRoyalLift,
  '/images/treatment-room.jpg': imageTreatmentRoom,
  '/images/botox-treatment.jpg': imageBotox,
};

export function resolveCmsImage(src?: string | null): ImageMetadata | undefined {
  if (!src) return undefined;

  return cmsImages[src];
}
