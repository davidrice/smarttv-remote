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
		if(err==null) {
			res.status(200);
		}
		else {
			res.status(400);
		}
	});
});

server.listen(config.server.port);
