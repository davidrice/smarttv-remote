var restify = require("restify");
var config = require("config");
var SamsungRemote = require("samsung-remote");

var remote = new SamsungRemote({
	ip: config.tv.ip
});

var server = restify.createServer({
	name:"smarttv-remote"
});

server.get('/smarttv/remote/:key', function(req, res) {
	var key = req.params.key;
	remote.send(key, function(err) {
		if(err) {
			console.log(err);
			res.status(400);
			res.end();
		}
		else {
			res.status(200);
			res.end();
		}
	});
});

server.listen(config.server.port);
