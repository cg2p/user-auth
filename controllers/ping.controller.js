//ping
exports.ping = function (req, res) {
    res.send('ping!');
    console.log("/ fired");
  };

//echo
exports.echo = function (req, res) {
  //const txt = req.
  res.json({
    echoText: "echo is" 
  });
  console.log("/echo fired");
};

