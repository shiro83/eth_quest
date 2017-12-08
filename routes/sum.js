var express = require('express');
var router = express.Router();

var base_eth = 1000;

const BERRY_GOOD = 'berry_good';
const GOOD = 'good';
const BAD = 'bad';
const BERRY_BAD = 'berry_bad';
const BERRY_GOOD_COEF = 1;
const GOOD_COEF = 0.8;
const BAD_COEF = 0.6;
const BERRY_BAD_COEF = 0.3;

var pie_json =
{
  cols: [{label: 'point', type: 'string'},
         {label: 'vote', type: 'number'}
  ],
  rows: [{c:[{v: BERRY_GOOD},{v: 0}]},
         {c:[{v: GOOD, f: 'よかった'},{v: 0}]},
         {c:[{v: BAD, f: 'よくなかった'},{v: 0}]},
         {c:[{v: BERRY_BAD, f: '最悪'},{v: 0}]}
  ]
};

var line_json =
{
  cols: [{label: 'time', type: 'string'},
         {label: 'Compensation', type: 'number'}],
  rows: [{c:[{v: '00:00:00'},{v: base_eth}]}]
};

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

router.get('/line', function(req, res, next) {
  var dt = new Date();
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var seconds = dt.getSeconds();

  var time = hours + ':' + minutes + ':' + seconds;

  line_json.rows.push({c:[{v: time},{v: calcSum()}]});

  res.json(line_json);
});

function calcSum(){
  var berry_good_val = 0;
  var good_val = 0;
  var bad_val = 0;
  var berry_bad_val = 0;

  for(key1 in pie_json.rows) {
    var c = pie_json.rows[key1];
    for(key in c){
      if (c[key][0].v == BERRY_GOOD) {
        berry_good_val = c[key][1].v;
      }
      if (c[key][0].v == GOOD) {
        good_val = c[key][1].v;
      }
      if (c[key][0].v == BAD) {
        bad_val = c[key][1].v;
      }
      if (c[key][0].v == BERRY_BAD) {
        berry_bad_val = c[key][1].v;
      }
    }
  }

  var total = berry_good_val + good_val + bad_val + berry_bad_val;
  if(total <= 0){
    return base_eth;
  }

  var berry_good_r = base_eth * BERRY_GOOD_COEF * berry_good_val / total;
  var good_r = base_eth * GOOD_COEF * good_val / total;
  var bad_r = base_eth * BAD_COEF * bad_val / total;
  var berry_bad_r = base_eth * BERRY_BAD_COEF * berry_bad_val / total;
  var r = berry_good_r + good_r + bad_r + berry_bad_r;
  return r.toFixed(7);
}

module.exports = router;
