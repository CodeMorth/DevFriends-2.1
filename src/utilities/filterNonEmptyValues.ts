import { userTypeLRU } from '@/interface/components';

export const filterNonEmptyValues = (obj: userTypeLRU): userTypeLRU => {
    const filteredObj: userTypeLRU = {};
  
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
        filteredObj[key] = obj[key];
      }
    }
  
    return filteredObj;
  }