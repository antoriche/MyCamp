import * as MockDB from './MockDB';
import * as MySQL from './MySQL';
import config from '../config.json';

export default config.database.useMock ? MockDB : MySQL;