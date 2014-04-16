var neo = require('neo4j');
var db = new neo.GraphDatabase('http://localhost:7474');

exports.masters = function(req, res) {
	db.query('MATCH (n:Master)\nRETURN n', function(err, data) {
		var results = [];
		forEach(data, function(item) {
			results.push(item.n._data.data);
		})
    console.log(results);
		res.json({data: results});
	})
};

exports.newMaster = function(req, res) {
	var params = {name: req.body.name}
	db.query('CREATE (n:Master {name: ({name})})', params, function (err) {
		if(err) { res.json(false) } else {
			res.json(true);
		}
	})
}

function forEach(array, fn) {
  for(var i = 0; i < array.length; i++) {
    fn(array[i]);
  }
}