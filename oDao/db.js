'use strict';

import { createConnection } from 'mysql';

export let connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'texas',
    database: 'library'
});