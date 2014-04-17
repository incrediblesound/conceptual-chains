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

exports.chain = function(req, res) {
  var params = {name: req.params.id},
  results = [];
  db.query('MATCH (n:Master)-[:CHILD_OF*1..]-(l:Child)\nWHERE n.name = ({name})\nRETURN l',params, function (err, data) {
    if(err) { console.log(err); } else {
      forEach(data, function (item, i) {
        results.push({name: item.l._data.data.name, distance: i});
      })
      res.json({data: results});
    }
  })
}

exports.newChild = function(req, res) {
  console.log(req.body);
  var params = {name: req.params.id},
      last = {},
      Query,
      firstChild = 'MATCH (n:Master)\nWHERE n.name = ({name})\nCREATE (n)<-[:CHILD_OF]-(l:Child {name: ({child})})\nRETURN l',
      endChild = 'MATCH (n:Child)\nWHERE n.name = ({name})\nCREATE (n)<-[:CHILD_OF]-(l:Child {name: ({child})})\nRETURN l';

  db.query('MATCH (n:Master)-[a:CHILD_OF*1..]-(l:Child)\nWHERE n.name = ({name}) AND NOT (l)<-[:CHILD_OF]-()\nRETURN l', params,
    function (err, data) {
      if(err) { console.log(err); } else {
        console.log(data);
        if(data.length < 1) {
          Query = firstChild;
          params.child = req.body.name;
        } else {
        last.name = data[0].l._data.data.name; //name of terminal child
        last.child = req.body.name; //name of new child
        params = last;
        Query = endChild;
        }
        db.query(Query,params, function(err, data) {
            if(err) {console.log('second query: ' + err);} else {
              res.json(true);
            }
          })
      }
    })
}

function forEach(array, fn) {
  for(var i = 0; i < array.length; i++) {
    fn(array[i], i);
  }
}