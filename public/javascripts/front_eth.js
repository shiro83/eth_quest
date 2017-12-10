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
