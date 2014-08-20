var express = require('express');
var router = express.Router();

var listControllers = require("../controllers/list.js");

var list = {};

list.list = function (req, res) {
	listControllers.list(req.params.page, function (err, results) {
		if(err){
			res.render("list/index", {});
		}else{
			res.render("list/index", {regex: results});
		}
	});
}

list.detail = function(req, res) {
	listControllers.getObject(req.params.id, function (err, result) {
		if(err) {
			res.redirect("list/list");
		}else {
			res.render("list/detail", result);
		}
	});
}

module.exports = router;