import { getSystemjsRequireUrls } from '../src/node/systemjs';
import { jsdelivr } from '../src/node/cdn';

console.log(getSystemjsRequireUrls(jsdelivr()[1]));
