module.exports = {
	API_ROOT: 'http://www.api.international.app.public-records.local.tcg.io',
	MAPBOX_TOKEN: 'pk.eyJ1IjoidGhlY29udHJvbGdyb3VwIiwiYSI6ImNpZW9zcHRxdDBoendzM2ttNm1tdDAzY3AifQ.ZibEsq1WAjWEztnvnJBH_g'
};

document.addEventListener('DOMContentLoaded', () => {
	window.device = {};
	setTimeout(window.initializeApp, 0);
}, false);
