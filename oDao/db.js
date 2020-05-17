'use strict';

import { createConnection } from 'mysql';

export default createConnection({
    host: 'localhost',
    user: 'root',
    password: 'texas',
    database: 'library'
});