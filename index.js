const express = require('express');
const app = express();
const fs = require("fs");
var proxy = require('express-http-proxy');
var bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/collect', proxy('https://hardwareSurvery.i10.repl.co/collect'));
const requestIp = require('request-ip');
app.get("/", function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get("/what", function(req, res) {
	res.send(['CHROME VERSION', 'CHROMEOS_FIRMWARE_VERSION', 'CHROMEOS_BOARD_APPID', 'GOOGLE_RELEASE', 'CHROMEOS_RELEASE_DESCRIPTION', 'CHROMEOS_RELEASE_BOARD', 'HWID', 'LOGDATE', 'ONBOARDING_TIME', 'account_type', 'ifconfig', 'monitor_info', 'uname', 'platform_identity_name', 'platform_identity_model', 'ENTERPRISE_ENROLLED', 'network_devices', 'network_services', 'power_supply_info', 'os-release BUILD_ID', 'os-release GOOGLE_CRASH_ID', 'oemdata', 'meminfo', 'lsusb'].join("<br>"));
});
app.get("/count", (req, res) => {
	let d = JSON.parse(fs.readFileSync(__dirname + "/data.json"));
	res.send("Count " + Object.keys(d).length);
});
app.listen(3000);
