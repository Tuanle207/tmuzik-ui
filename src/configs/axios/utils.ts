import { IObject } from '../../utils/interfaces';

export const parseQueryString = (params: IObject = {}) => {
  return Object.keys(params).reduce((queryStr, current, index) => {
    const head = index === 0 ? '?' : `${queryStr}&`;
    return `${head}${current}=${params[current]}`;
  }, '');
};