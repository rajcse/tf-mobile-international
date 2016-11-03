'use strict';

const TARGET = process.env.npm_lifecycle_event;
let env = 'build';

switch (TARGET) {
	case 'start':
	case 'start:prod':
	case 'ios':
	case 'android':
		env = 'development';
}

module.exports = env;
