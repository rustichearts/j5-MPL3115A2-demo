module.exports = (server)=> {
  // sensing用プロセスを起動
  var child = require("child_process").fork(__dirname + "/sensing");

  var io = require('socket.io')(server);
  io.on('connection',(socket)=> {
    socket.emit("connected", {hello: "world"});

    // Sensorプロセスからのメッセージ受信
    child.on("message", function(data){
      if(data.action=="ready") {
        console.log("ready");
      }
      else if(data.action == "ping") {
        socket.emit("ping", data);
      }
      else if(data.action == "sensor") {
        socket.emit("sensor", data.value);
      }
    });
  });
};
