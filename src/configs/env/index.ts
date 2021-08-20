import { EnvType, IENV } from './type';

const ENV: IENV = {
  env: EnvType.Development,
  apiUrl: 'https://localhost:5000',
  fb: {
    appId: '2964497603821160',
    version: 'v11.0',
  },
  enableLogger: true
};

export default ENV;