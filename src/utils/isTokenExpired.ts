import moment from 'moment';

export const isTokenExpired = (expiryTime: string) => {
  try {
    const expiryDate = moment.utc(expiryTime);

    if (!expiryDate.isValid()) {
      return true;
    } 

    const current = moment();
    return expiryDate.toDate() <= current.toDate(); 
  } catch (err) {
    return true;
  }
};