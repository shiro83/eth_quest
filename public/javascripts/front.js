  $(function(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    setInterval(drawChart,2000);
  });
  function drawChart() {
    var jsonData = $.ajax({
             url: "/pie",
             dataType: "json",
             async: false
             }).responseText;

   var data = new google.visualization.DataTable(jsonData);

   var options = {
     title: 'My Daily Activities'
   };

   var chart = new google.visualization.PieChart(document.getElementById('piechart'));

   chart.draw(data, options);
  }
