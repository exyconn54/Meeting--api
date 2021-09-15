const app = require("express")();
var cors = require("cors");
const Meeting = require("google-meet-api").meet;
const port = 4000;
app.use(cors());
app.get("/", (req, res) => res.send(req.body));

app.get("/newmeet", (req, res) => {
  let access = req.query.params.replace("\"","").replace("\"","")
  console.log(access)
  Meeting({
    clientId:
      "943585419709-nu48s5l0o96pjpltnjvrgdvggt20ddem.apps.googleusercontent.com",
    clientSecret: "s9n5PpR-2KlRK-5YaNmvEhRP",
    refreshToken: access,
    date: "2021-12-26",
    time: "20:50",
    summary: "summary",
    location: "location",
    description: "description",
  }).then(function (result) {
    console.log(result);
    res.send(JSON.stringify(result))
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
