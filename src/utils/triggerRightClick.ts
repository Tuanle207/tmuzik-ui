export const triggerRightClick = (element: Element, {x, y}: {x: number; y: number;}) => {

  // const { x, y } = element.getCl();

  const ev1 = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: false,
    view: window,
    button: 2,
    buttons: 2,
    clientX: x,
    clientY: y
  });
  element.dispatchEvent(ev1);
  const ev2 = new MouseEvent('mouseup', {
    bubbles: true,
    cancelable: false,
    view: window,
    button: 2,
    buttons: 0,
    clientX: x,
    clientY: y
  });
  element.dispatchEvent(ev2);
  const ev3 = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    view: window,
    button: 2,
    buttons: 0,
    clientX: x,
    clientY: y
  });
  element.dispatchEvent(ev3);
};