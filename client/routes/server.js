var serverController = require("../controllers/server");

var server = {};

// ALL: /server/startup
server.startup = function (req, res) {
	if(req.method == "POST") {
		var port = Number(req.body.port);
		if(isNaN(port)) {
			res.writeHead(400);
			res.end("port is not number");
		}else {
			serverController.startup(port);
			res.redirect("/server/liststatus");
		}
	}else if(req.method == "GET") {
		res.render("server/startup");
	}else {
		res.wliststatusriteHead(400);
		res.end();
	}
}

// GET: /server
// GET: /server/liststatus
server.listStatus = function (req, res) {
	serverController.list(function(err, result){
		if(err) {
			res.writeHead(404);
			res.end();
			return;
		}
		var m_result = {
			title: "server list",
			result:result
		}
		res.render("server/listStatus", m_result);
	});
	
}

// GET: /server/stop
server.stop = function (req, res) {
	serverController.stopAll(function (err) {
		if(err) {
			res.writeHead(400);
			res.end(err.toString());
		}else {
			res.redirect("/server");
		}
	});
}

// GET: /server/restart
server.restart = function (req, res) {
	serverController.restartAll(function (err) {
		if(err) {
			res.writeHead(400);
			res.end(err.toString());
		}else {
			res.redirect("/server");
		}
	});
}

module.exports = server;