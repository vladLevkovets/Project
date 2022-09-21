import { atom } from 'recoil'

export const titleState = atom({
    key: 'titleState',
    default: '',
  });

  export const authorState = atom({
    key: 'authorState',
    default: '',
  });  

  export const idState = atom({
    key: 'idState',
    default: '',
  });

  export const resState = atom({
    key: 'resState',
    default: [],
  });