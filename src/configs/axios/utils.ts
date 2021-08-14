import { Util } from '../../utils/interfaces';

export const parseQueryString = (params: Util.IObject = {}) => {
  return Object.keys(params).reduce((queryStr, current, index) => {
    const head = index === 0 ? '?' : `${queryStr}&`;
    return `${head}${current}=${params[current]}`;
  }, '');
};