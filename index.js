var express = require('express');
const {uuid} = require('express-cassandra');
var app = express();
var models = require('express-cassandra');

models.setDirectory( __dirname + '/models').bind(
   {
       clientOptions: {
           contactPoints: ['127.0.0.1'],
           keyspace: 'tesla',
           localDataCenter: 'datacenter1',
           queryOptions: {consistency: models.consistencies.one}
       },
       ormOptions: {
           defaultReplicationStrategy : {
               class: 'SimpleStrategy',
               replication_factor: 1
           },
           migration: 'safe'
       }
   },
   function(err) {
       if(err) throw err;
   }
);

app.get('/event/create/:name/:value', function(req, res) {
    var event = new models.instance.Event({
        name: req.params.name,
        id: uuid().toString(),
        value: req.params.value,
        last_update_timestamp: Date.now()
    });
    event.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        res.send(event);
        console.log('event saved!');
    });
});

app.get('/events/:name', function (req, res) {
    models.instance.Event.find({name: req.params.name},{allow_filtering: true}, function(err, events){
        if(err) throw err;
        console.log('Found ', events);
        res.json(events)
    });
});

app.listen(3000);
