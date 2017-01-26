module.exports = {
	// API_ROOT: 'http://www.api.truthfinder.app.public-records.local.tcg.io',
	API_ROOT: 'https://api.truthfinder.com',
	MAPBOX_TOKEN: 'pk.eyJ1IjoidGhlY29udHJvbGdyb3VwIiwiYSI6ImNpZW9zcHRxdDBoendzM2ttNm1tdDAzY3AifQ.ZibEsq1WAjWEztnvnJBH_g'
};

document.addEventListener('DOMContentLoaded', () => {
	window.device = {};
	setTimeout(window.initializeApp, 0);
}, false);
