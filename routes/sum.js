var express = require('express');
var router = express.Router();

// var pie_json = '{"cols": [{"label":"Topping","type":"string"},{"label":"Slices","type":"number"}],"rows": [{"c":[{"v":"Mushrooms"},{"v":3}]},{"c":[{"v":"Onions"},{"v":1}]},{"c":[{"v":"Olives"},{"v":1}]}, {"c":[{"v":"Zucchini"}, {"v":1}]}, {"c":[{"v":"Pepperoni"},{"v":2}]}]}';
// var pie_json = [{cols: [{label":"Topping","type":"string"},{"label":"Slices","type":"number"}],"rows": [{"c":[{"v":"Mushrooms"},{"v":3}]},{"c":[{"v":"Onions"},{"v":1}]},{"c":[{"v":"Olives"},{"v":1}]}, {"c":[{"v":"Zucchini"}, {"v":1}]}, {"c":[{"v":"Pepperoni"},{"v":2}]}]}];

var pie_json =
{
  cols: [{label: 'Topping', type: 'string'},
         {label: 'Slices', type: 'number'}
  ],
  rows: [{c:[{v: 'berry_good'},{v: 0}]},
         {c:[{v: 'good'},{v: 0}]},
         {c:[{v: 'bad'},{v: 0}]},
         {c:[{v: 'berry_bad'},{v: 0}]}
  ]
};

/* GET home page. */
router.get('/pie', function(req, res, next) {
  res.json(pie_json);
});


router.get('/vote', function(req, res, next) {
  console.log(req.query.vote);
  var vote_val = req.query.vote;
  for(key1 in pie_json.rows) {
    var c = pie_json.rows[key1];
    for(key in c){
      if (c[key][0].v == vote_val) {
        c[key][1].v += 1;
      }
    }
  }
  res.send();
});

module.exports = router;
