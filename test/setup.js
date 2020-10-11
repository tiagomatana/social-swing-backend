const mongoose = require('mongoose');

// Load models since we will not be instantiating our express server.
require('../app/models/Account');
require('../app/models/Profile');
global.console = {
    log: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    table: jest.fn()
}
