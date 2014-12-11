var dotenv = require('dotenv');
dotenv.load();
var pg = require('pg');
var express = require('express');
var body_parser = require('body-parser');
var app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({
  extended: true
}));

var PORT = process.env.PORT || 1337;

var POSTGRES_CLIENT = {
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || 'coachk',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432
};

app.get('/', function(req, res) {
  res.send('what up :]');
});

app.get('/students', function(req, res) {
  var query_text = 'SELECT * FROM STUDENT';

  var postgres_client = new pg.Client(POSTGRES_CLIENT);

  postgres_client.connect();

  var query = postgres_client.query(query_text);

  query.on('row', function(row, result) {
    result.addRow(row);
  });

  query.on('error', function(error) {
    console.log(error);
    res.json({
      status: 'error',
      data: null,
      message: error.toString()
    });
  });

  query.on('end', function(result) {
    res.json({
      status: 'success',
      data: result.rows,
      message: 'success'
    });
    postgres_client.end();
  });

});

app.get('/student', function(req, res) {
  if (!req.query.user_id) {
    res.json({
      status: 'error',
      data: null,
      message: 'missing user id parameter'
    });
    return;
  }

  var query_text = 
  'SELECT * \
  FROM STUDENT \
  WHERE USER_ID = $1';
  var query_params = [req.query.user_id];

  var postgres_client = new pg.Client(POSTGRES_CLIENT);

  postgres_client.connect();

  var query = postgres_client.query(query_text, query_params);

  query.on('row', function(row, result) {
    result.addRow(row);
  });

  query.on('error', function(error) {
    console.log(error);
    res.json({
      status: 'error',
      data: null,
      message: error.toString()
    });
  });

  query.on('end', function(result) {
    if (result.rows.length <= 0) {
      res.json({
        status: 'unregistered',
        data: null,
        message: 'user does not exist'
      });
    } else {
      res.json({
        status: 'success',
        data: result.rows,
        message: 'success'
      });
    }
    postgres_client.end();
  });

});

app.post('/student', function(req, res) {
  var query_text = 
  'INSERT \
  INTO STUDENT \
  (USER_ID, GENRE, MIX_ID, OVERALL_PACE, TOTAL_DISTANCE) \
  VALUES ($1, $2, $3, $4)';
  var query_params = [req.body.user_id, req.body.genre, req.body.mix_id, req.body.overall_pace, req.body.total_distance];

  var postgres_client = new pg.Client(POSTGRES_CLIENT);

  postgres_client.connect();

  postgres_client.query(query_text, query_params, function(error, result) {
    if (error) {
      console.log(error);
      res.json({
        status: 'error',
        data: null,
        message: error.toString()
      });
    } else {
      res.json({
        status: 'success',
        data: result,
        message: 'success'
      });
    }
    postgres_client.end();
  });

});

app.put('/student', function(req, res) {
  var query_text = 
  'UPDATE STUDENT\
  SET \
	GENRE = $2, \
	OVERALL_PACE = $3, \
	TOTAL_DISTANCE = $4 \
	WHERE \
	USER_ID = $1';
  var query_params = [req.body.user_id, req.body.genre, req.body.overall_pace, req.body.total_distance];

  var postgres_client = new pg.Client(POSTGRES_CLIENT);

  postgres_client.connect();

  postgres_client.query(query_text, query_params, function(error, result) {
    if (error) {
      console.log(error);
      res.json({
        status: 'error',
        data: null,
        message: error.toString()
      });
    } else {
      res.json({
        status: 'success',
        data: result,
        message: 'success'
      });
    }
    postgres_client.end();
  });

});

app.post('/run', function(req, res) {

  if (!req.body.user_id) {
    res.json({
      status: 'error',
      data: null,
      message: 'missing user id parameter'
    });
    return;
  }

  var query_text = 
  'INSERT \
  INTO RUN \
  (USER_ID, SECONDS, MINUTES, HOURS, DISTANCE, TIMESTAMP, COORDINATES) \
  VALUES ($1, $2, $3, $4, $5, $6, $7)';
  var query_params = [
    req.body.user_id, 
    req.body.seconds,
    req.body.minutes,
    req.body.hours,
    req.body.distance,
    req.body.timestamp,
    req.body.coordinates
  ];

  var postgres_client = new pg.Client(POSTGRES_CLIENT);

  postgres_client.connect();

  postgres_client.query(query_text, query_params, function(error, result) {
    if (error) {
      console.log(error);
      res.json({
        status: 'error',
        data: null,
        message: error.toString()
      });
    } else {
      res.json({
        status: 'success',
        data: result,
        message: 'success'
      });
    }
    postgres_client.end();
  });

});

app.get('/runs', function(req, res) {

  if (!req.query.user_id) {
    res.json({
      status: 'error',
      data: null,
      message: 'missing user id parameter'
    });
    return;
  }

  var query_text = 
  'SELECT * \
  FROM RUN \
  WHERE USER_ID = $1';
  var query_params = [req.query.user_id];

  var postgres_client = new pg.Client(POSTGRES_CLIENT);

  postgres_client.connect();

  var query = postgres_client.query(query_text, query_params);

  query.on('row', function(row, result) {
    result.addRow(row);
  });

  query.on('error', function(error) {
    console.log(error);
    res.json({
      status: 'error',
      data: null,
      message: error.toString()
    });
  });

  query.on('end', function(result) {
    res.json({
      status: 'success',
      data: result.rows,
      message: 'success'
    });
    postgres_client.end();
  });
   
});

app.listen(PORT);

