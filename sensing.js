var five = require("johnny-five");
var board = new five.Board();

// debug
// setInterval(()=>{
//   process.send({ action: "ping" });
// },5000);
// setInterval(()=>{
//   var rand = 25 +  Math.floor( Math.random() * 10 ) ;
//   process.send({ action: "sensor", value: rand });
// },1000);

board.on("ready", function() {
  console.log("ready");
  // Board Readyを親プロセスに送信
  process.send({ action: "ready" });

  var multi = new five.Multi({
    controller: "MPL3115A2",
    // Change `elevation` with whatever is reported
    // on http://www.whatismyelevation.com/.
    // `12` is the elevation (meters) for where I live in Brooklyn
    elevation: 12,
  });

  // 温度が変化した時
  multi.on("change", function(){

    console.log("temperature");
    console.log("  celsius      : ", this.temperature.celsius);
    console.log("  fahrenheit   : ", this.temperature.fahrenheit);
    console.log("  kelvin       : ", this.temperature.kelvin);
    console.log("--------------------------------------");

    console.log("barometer");
    console.log("  pressure     : ", this.barometer.pressure);
    console.log("--------------------------------------");

    console.log("altimeter");
    console.log("  feet         : ", this.altimeter.feet);
    console.log("  meters       : ", this.altimeter.meters);
    console.log("--------------------------------------");

    // 温度変化を親プロセスに送信
    process.send({ action: "sensor", value: this.temperature.celsius });

  });
});