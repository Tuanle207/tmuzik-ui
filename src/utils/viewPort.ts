const win = window, doc = document, docElem = doc.documentElement, body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;

export const viewPort = {
  width: x,
  height: y
};