var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// // at /
// router.get('/', function(req, res) {
//     res.redirect('/index');
// });



router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = { 
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});


// route for creating burger
router.post("/burgers/insertOne", function(req, res) {
    burger.insertOne(
        ["burger_name"], [req.body.name], function(data) {
        res.redirect("/");
    });
});

// route for updating burger
router.put("burgers/updateOne:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burger.updateOne({devoured: req.body.devoured}, condition, function() {
        res.redirect('/');
    });
});


// Export routes for server.js to use.
module.exports = router;