var express = require('express');
var router = express.Router();

// var pie_json = '{"cols": [{"label":"Topping","type":"string"},{"label":"Slices","type":"number"}],"rows": [{"c":[{"v":"Mushrooms"},{"v":3}]},{"c":[{"v":"Onions"},{"v":1}]},{"c":[{"v":"Olives"},{"v":1}]}, {"c":[{"v":"Zucchini"}, {"v":1}]}, {"c":[{"v":"Pepperoni"},{"v":2}]}]}';
// var pie_json = [{cols: [{label":"Topping","type":"string"},{"label":"Slices","type":"number"}],"rows": [{"c":[{"v":"Mushrooms"},{"v":3}]},{"c":[{"v":"Onions"},{"v":1}]},{"c":[{"v":"Olives"},{"v":1}]}, {"c":[{"v":"Zucchini"}, {"v":1}]}, {"c":[{"v":"Pepperoni"},{"v":2}]}]}];

var pie_json =
{
  cols: [{label: 'Topping', type: 'string'},
         {label: 'Slices', type: 'number'}
  ],
  rows: [{c:[{v: 'a'},{v: 1}]},
         {c:[{v: 'b'},{v: 33}]},
         {c:[{v: 'c'},{v: 22}]}
  ]
};

/* GET home page. */
router.get('/pie', function(req, res, next) {

  for(key1 in pie_json.rows) {
    var c = pie_json.rows[key1];
    for(key in c){
      if (c[key][0].v == 'a') {
        c[key][1].v += 1;
        console.log(c[key][1].v);
      }
    }
  }

});


router.get('/vote', function(req, res, next) {
  console.log("vote");
  // console.log(req.query.vote);
});

module.exports = router;
