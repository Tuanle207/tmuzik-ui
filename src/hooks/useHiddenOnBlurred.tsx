/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect } from 'react';
import { isDescendant } from '../utils/isDescendant';

interface IHiddenOnBlurredInput {
  display: boolean;
  displaySetter: (display: boolean) => void;
  exceptSpaceRef?: MutableRefObject<null>[];
}

export const useHiddenOnBlurred = ({
  exceptSpaceRef = [],
  display,
  displaySetter
}: IHiddenOnBlurredInput) => {

  useEffect(() => {
    const hideMenuOnBlurred = (e: any) => {
      let handle = true;

      exceptSpaceRef.forEach((ref) => {
        const ins = ref?.current;
        if (e.target === ins || isDescendant(ins, e.target)) {
          handle = false;
        }
      })

      if (display && handle) 
      { 
        displaySetter(false);
      }
    };

    window.addEventListener('mouseup', hideMenuOnBlurred);

    return () => {
      window.removeEventListener('mouseup', hideMenuOnBlurred);
    }
  }, [ display ]);

}