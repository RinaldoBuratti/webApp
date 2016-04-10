// variables.
var path = require('path')
var express = require('express')
var http = require('http')
var app = express()
var elasticsearch = require('elasticsearch');

// elastic search client.
var client = new elasticsearch.Client({
  host: 'localhost:9300',
  log: 'trace'
});

// get suggestions from elastic search.
app.get('/suggestions', function(req, res) {
	var q = req.query.q;

	client.search({
	  index: pages,
		body: {
			suggest : {
		    text : q,
		    simple_phrase : {
		      phrase : {
		        field : 'Body',
		        direct_generator: [{
		          field : 'Body',
		          suggest_mode : 'always',
		          min_word_length : 3,
		          prefix_length: 2
		        
		        }]
		      }
		    }
		  }
		}
	}).then(function (resp) {
	  res.json(resp);
	}, function (err) {
	  res.status(500).json({});
	});
});