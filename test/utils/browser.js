require('babel-register')();

let jsdom = require('jsdom').jsdom;

let exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
		exposedProperties.push(property);
		global[property] = document.defaultView[property];
	}
});

global.navigator = {
	userAgent: 'node.js'
};

window.localStorage = window.sessionStorage = {
	getItem: function (key) {
		return this[key];
	},
	setItem: function (key, value) {
		this[key] = value;
	}
};

window.device = {};

documentRef = document;
