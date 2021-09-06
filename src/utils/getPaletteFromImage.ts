import Vibrant from 'node-vibrant';
import { Palette } from 'node-vibrant/lib/color';

export const getPaletteFromImage = (src: string): Promise<Palette | undefined> => {
  return new Promise((resolve, reject): void => {
    Vibrant
      .from(src)
      .getPalette((err, palatte) => {
        if (err) {
          return resolve(undefined);
        }
        resolve(palatte);
      });
  });
}