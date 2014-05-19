/**
 * Created by jrubio on 12/15/13.
 */
var restify = require('restify');
var couchbase = require('couchbase');

function respond(req, res, next) {

    var db = new couchbase.Connection({host: 'localhost:8091', bucket: 'default'}, function(err) {
        if (err) throw err;

        db.set('testdoc', {name:req.params.name}, function(err, result) {
            if (err) throw err;

            db.get('testdoc', function(err, result) {
                if (err) throw err;

                res.send(result.value);
                // {name: Frank}
            });
        });
    });



}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});