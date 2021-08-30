/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { isDescendant } from '../utils/isDescendant';

interface IHiddenOnBlurredInput {
  display: boolean;
  displaySetter: (display: boolean) => void;
  exceptSpaceNodes?: (React.MutableRefObject<any> | Element | null)[];
  callback?: () => void;
}

export const useHiddenOnBlurred = ({
  exceptSpaceNodes = [],
  display,
  displaySetter,
  callback = () => {}
}: IHiddenOnBlurredInput) => {

  useEffect(() => {
    const hideMenuOnBlurred = (e: any) => {
      let handle = true;

      exceptSpaceNodes.forEach((node) => {

        if (node === null) { 
          console.log('node === null')
          return;
        }
        
        const ins = (node as React.MutableRefObject<Element>).current;

        if (ins && (e.target === ins || isDescendant(ins, e.target))) {
          handle = false;
          console.log('e.target === ins || isDescendant(ins, e.target))')

          return;
        }

        if (e.target === node || isDescendant(node, e.target)) {
          console.log('e.target === node || isDescendant(node, e.target)')
          handle = false;
        }
      });

      if (display && handle) 
      { 
        displaySetter(false);
        callback();
      }
    };

    window.addEventListener('mouseup', hideMenuOnBlurred);

    return () => {
      window.removeEventListener('mouseup', hideMenuOnBlurred);
    }
  }, [ display ]);

}