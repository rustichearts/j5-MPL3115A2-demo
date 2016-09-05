(function(io){
  var hostname = location.hostname;
  var socket = io.connect("http://" + hostname + ":3000");

  document.addEventListener("DOMContentLoaded", function(event) {
    var ctx = document.getElementById("myChart");
    var labels = [];
    var data = []
    for (var i=0; i<60; i++) {
      labels[i] = "";
      data[i] = -1;
    }
    var data = {
      labels: labels,
      datasets: [
        {
          label: "温度",
          responsive: false,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data,
          spanGaps: false,
        }
      ]
    };

    var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        animation : false,
        scales: {
          yAxes: [{
            ticks: {
              // beginAtZero: true,
              // steps: 10,
              // stepValue: 5,
              max: 40,
              min: 25
            }

          }]
        }
      }
    });

    socket.on("ping", (data)=>{
      console.log(data);
    });

    socket.on("connected", (data)=>{
      console.log(data);
    });

    socket.on("sensor", (value)=>{
      console.log(value);

      var data = myChart.config.data.datasets[0].data;
      while(data.length >= 60){
        data.shift();
      }

      data.push(value);
      myChart.update();
    });

  });

})(window.io);
