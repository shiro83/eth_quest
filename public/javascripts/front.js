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
        url: "/sum/init",
        async: false
      });
    });

    $('.vote_click').on("click", function(event) {
      // HTMLでの送信をキャンセル
      event.preventDefault();

      // 操作対象のフォーム要素を取得
      var val = $(this).val();

      // 送信
      $.ajax({
        url: "/sum/vote",
        async: false,
        data: {
          "vote": val
        },
        timeout: 10000, // 単位はミリ秒

        // 送信前
        beforeSend: function(xhr, settings) {
          // ボタンを無効化し、二重送信を防止
          $('.vote_click').attr('disabled', true);
        },
        
        // 応答後
        complete: function(xhr, textStatus) {
          setTimeout(function() {
            // ボタンを有効化し、再送信を許可
            $('.vote_click').attr('disabled', false);
          }, 1000);
        },

        // 通信成功時の処理
        success: function(result, textStatus, xhr) {

        },

        // 通信失敗時の処理
        error: function(xhr, textStatus, error) {
          alert('NG...');
        }
      });
    });
  });

  function timeIsUp() {
    alert('Your code');
  }

  function drawChart_pie() {
    var jsonData = $.ajax({
      url: "/sum/pie",
      dataType: "json",
      async: false
    }).responseText;

    var data = new google.visualization.DataTable(jsonData);

    var options = {
      title: 'アンケート',
      slices: {
        0: {
          color: 'blue'
        },
        1: {
          color: 'green'
        },
        2: {
          color: '#ffc107'
        },
        3: {
          color: 'red'
        }
      }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

  function drawChart_line() {
    var jsonData = $.ajax({
      url: "/sum/line",
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
