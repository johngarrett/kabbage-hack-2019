var express = require('express');
var router = express.Router();
var moment = require('moment');
var request = require('request');

router.get('/:date', function(req, res) {
    request.get('http://lunch.kabbage.com/api/v2/lunches/' + req.params.date,
        (error, response, body) => {
            if (error) {
                return res.sendStatus(400);
            }

            return res.send(response.body);
        }
    );
});

module.exports = router;
