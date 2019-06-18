const express = require("express");
const app = express();
const path = require("path");
const settings = require("../util/settings");

const { port } = settings.get().web_server;

app.set("view engine", "html");
app.engine("html", require("hbs").__express);

app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/status", function(req, res) {
    let state = settings.get(),
        { permit_join } = state,
        devices = settings.getDevices();
    res.json({ permit_join, devices });
});
app.get("/settings", function(req, res) {
    if (req.query.permit_join) {
        settings.set(["permit_join"], req.query.permit_join == "true");
    }
    res.json({ success: true });
});
app.get("/control", function(req, res) {
    controller.onMQTTMessage("topic", "message");
    res.json({ success: true });
});
app.get("/", function(req, res) {
    res.render("index", { title: "abc" });
});

let controller = null;

module.exports = function(mainController) {
    controller = mainController;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};
