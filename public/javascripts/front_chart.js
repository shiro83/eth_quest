var compensation = 0;

  $(function() {
    $('#start_button').on("click", function() {

      $("#start_button").remove();

      $("#future_date").countdowntimer({
        minutes: 1,
        size: "xl",
        timeUp: timeIsUp
      });

      google.charts.load('current', {
        'packages': ['corechart']
      });
      google.charts.setOnLoadCallback(drawChart_pie);
      google.charts.setOnLoadCallback(drawChart_line);
      setInterval(drawChart_pie, 2000);
      setInterval(drawChart_line, 3000);

      $.ajax({
        url: "/chart/init",
        async: false
      });
    });
  });

  function timeIsUp() {
    alert('Your code');
  }

  function drawChart_pie() {
    var jsonData = $.ajax({
      url: "/chart/pie",
      dataType: "json",
      async: false
    }).responseText;

    var data = new google.visualization.DataTable(jsonData);

    var options = {
      title: 'アンケート',
      slices: {
        0: {color: 'blue'},
        1: {color: 'green'},
        2: {color: '#ffc107'},
        3: {color: 'red'}
      }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

  function drawChart_line() {
    var jsonData = $.ajax({
      url: "/chart/line",
      dataType: "json",
      async: false
    }).responseText;

    var data = new google.visualization.DataTable(jsonData);

    var options = {
      title: '報酬高（ETH）',
      curveType: 'function',
      legend: {
        position: 'bottom'
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }

///////////////////////
//box-logs
var box_logs_pending = document.querySelector("#box_logs_pending");
var box_logs_complete = document.querySelector("#box_logs_complete");
var addr_contract = "0xc2ca8784a123ae830c3d7f361ae0f3490a10bf1a";
var abi = [{"constant":false,"inputs":[],"name":"get_num","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"num","type":"int256"}],"name":"set_num","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"num","type":"int256"}],"name":"ev_set_num","type":"event"}];
var obj_contract = web3.eth.contract(abi).at(addr_contract);
//example:address
var addr = document.querySelector("#addr");
var addr_all = String(web3.eth.accounts);
var addr_array = addr_all.split(",");
var addr_len = addr_array.length;
for (i = 0; i < addr_len; i++) {
    document.getElementById("addr").innerHTML += "address[" + i + "]: " + addr_array[i] + "<br>";
    console.log(addr_array[i]);
}
//set_num
var btn_set_num = document.querySelector("#btn_set_num");
let input_from;
let input_pw;
let input_set_num;
btn_set_num.onclick = function() {
    input_from = document.querySelector("#input_from").value;
    input_pw = document.querySelector("#input_pw").value;
    input_set_num = document.querySelector("#input_set_num").value;
    //Unlock address
    //web3.personal.unlockAccount(input_from,input_pw,600);
    //Send Transaction
    // let response_setnum = obj_contract.set_num.sendTransaction(input_set_num, {from:input_from, gas:10000});
    let response_setnum = web3.eth.sendTransaction({from:'0xc2ca8784a123ae830c3d7f361ae0f3490a10bf1a', to:'0xd7755a25936db0da89be2cc6ac636e6ab7454b39', value: web3.toWei(45, "ether")});
    console.log("response_setnum: ", response_setnum);
}
//get_num
var output_get_num = document.querySelector("#output_get_num");
var btn_get_num = document.querySelector("#btn_get_num");
btn_get_num.onclick = function() {
    let response_getnum = obj_contract.get_num.call();
    output_get_num.innerHTML = response_getnum;
}
/* イベント監視　*/
//送信
var txhash;
var tx_info;
var filter = web3.eth.filter("pending");
//resultにはblock hashが返される。
filter.watch(function(error, result) {
    txhash = result;
    tx_info = web3.eth.getTransaction(txhash);
    box_logs_pending.innerHTML += "tx: " + txhash + "<br>"
                            + "（送信元アドレス）: " + tx_info.from + "<br>";
});
//完了
var send_addr;
var event = obj_contract.ev_set_num();
event.watch(function(error,result) {
    var send_addr = web3.eth.getTransaction(result.transactionHash).from;
    box_logs_complete.innerHTML += "tx: " + result.transactionHash + "　：[状態] complete" + "<br>"
                        + "[完了情報] " + "（ブロックNo.）: " + result.blockNumber
                        + "（送信元アドレス）： " + send_addr
                        + "　(入力値）； " + result.args.num + "<br>";
});
