import * as MockDB from './MockDB';
import * as MySQL from './MySQL';
import config from '../config.json';

if(!config.database.useMock){
  let ok = true;
  for (const f in MockDB){
    if(!MySQL[f]){
      console.error(f+" is not implemented with MySQL");
      ok = false;
    }
  }
  if(!ok)process.exit(1);
}

export default config.database.useMock ? MockDB : MySQL;