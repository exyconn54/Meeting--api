const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');
const app = require('express')();
var email;
const port = 5000;
var cors = require("cors");

const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);

app.use(cors());
app.get('/', (req,res) => res.send(req.body));

app.get("/newmeeting", (req, res) => {
  let data = JSON.parse(req.query.params)
    email = data;
    var options = {
      method: "POST",
      uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
      body: {
        topic: "test create meeting",
        type: 1,
        settings: {
          host_video: "true",
          participant_video: "true"
        }
      },
      auth: {
        bearer: token
      },
      headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json"
      },
      json: true
    };
  
    rp(options)
      .then(function(response) {
        console.log("response is: ", response);
        res.send(JSON.stringify(response));
      })
      .catch(function(err) {
        console.log("API call failed, reason ", err);
      });
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));