import Vibrant from 'node-vibrant';
import { Palette } from 'node-vibrant/lib/color';

export const getPaletteFromImage = async (src: HTMLImageElement): Promise<Palette | undefined> => {
  if (!src) return undefined;

  // create new img with crossOrigin setting
  const img = new Image();
  img.src = src.src + '?' + new Date().getTime();
  img.setAttribute('crossOrigin', '');

  return new Promise((resolve): void => {
    Vibrant
      .from(img)
      .getPalette((err, palatte) => {
        if (err) {
          return resolve(undefined);
        }
        resolve(palatte);
      });
  });
}