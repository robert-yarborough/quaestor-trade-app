import { addMqTriggers } from './plugins/media-queries';
import setHeaderAction from './modules/common/header.js';
import setMain from './main.js';

addMqTriggers();
setHeaderAction();
setMain();