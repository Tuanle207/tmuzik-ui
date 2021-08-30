import { EnvType, IENV } from './type';

const ENV: IENV = {
  env: EnvType.Deployment,
  apiUrl: 'http://localhost:5000',
  fb: {
    appId: '2964497603821160',
    version: 'v11.0',
  },
  requestTimeout: 15000,
  enableLogger: false
};

export default ENV;