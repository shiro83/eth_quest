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

// var cart = [
//   { name:"タマネギ", price:80, quantity:3 },
//   { name:"じゃがいも", price:60, quantity:5 },
//   { name:"ニンジン", price:40, quantity:4 }
// ];
//
// var items = [];
// var totalPrice = 0;
// var totalQuantity = 0;
//
// for(key in cart){
//     items.push(cart[key].name);
//     totalPrice += cart[key].price  * cart[key].quantity ;
//     totalQuantity += cart[key].quantity ;
// }
// output(items) ;
// output(totalPrice);
// output(totalQuantity);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('aaaaaaaaaaa');
  pie_json[rows][]

  res.json(pie_json);
});

module.exports = router;
