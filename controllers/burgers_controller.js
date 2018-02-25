var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");


router.get("/", function(req, res){
    res.redirect("burgers");
});

router.get("/burgers", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = { 
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});


// route for creating burger
router.post('/burgers/insertOne', function(req, res) {
    burger.insertOne(['burger_name', 'devoured'], [req.body.name, false], function(res) {
        res.redirect('/');
    });
});

// route for updating burger
router.put('/burgers/updateOne/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;
    console.log('condition', condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(res) {
        res.redirect('/');
    });
});

// Export routes for server.js to use.
module.exports = router;