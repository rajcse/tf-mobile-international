/**
 * Quick script to update the app semver version and Android versionCode in config.xml
 */

const fs = require('fs');

const version = process.argv[2];
if(!version) throw new Error('No version specified');

let	build = '',
	buildNumber = 1;
if(~process.argv.indexOf('-b')) {
	build = process.argv[process.argv.indexOf('-b') + 1];
	buildNumber = Number(build.replace(/[^\d]/g, ''));

	// Build flags must cohere to Apple standards or be purely numeric
	// https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/20001431-102364
	if(!/^(d|a|b|fc)\d{1,3}$/.test(build) && !Number(build)) throw new Error('Invalid build specified');
}

const calculateVersion = (a, b, c) => (
	String((a*10000 + b*100 + c)*1000 + 1000000000 + buildNumber)
);

const versionFromSemver = (semver) => {
	const semverParts = semver.split('.');

	if(semverParts.length !== 3) throw new Error('Invalid semver version');

	return calculateVersion(Number(semverParts[0]), Number(semverParts[1]), Number(semverParts[2]));
};

const versionCode = versionFromSemver(version);

process.stdout.write(versionCode);

let configXml;
try {
	configXml = fs.readFileSync('./config.xml', 'utf8');
	configXml = configXml.replace(/(<widget[^>]*version=)"[\d.]*"/, `$1"${version}"`);
	configXml = configXml.replace(/(android-versionCode=)"\d*"/, `$1"${versionCode}"`);
	configXml = configXml.replace(/(ios-CFBundleVersion=)"[\d.]*\w*"/, `$1"${version}${build}"`);
	fs.writeFileSync('./config.xml', configXml, 'utf8');
} catch(e) {
	console.log(e);
}
