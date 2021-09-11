const path = require('path');
var express = require('express');
var router = express.Router();
var mysqlpool = require('../dbconfig');
var multer = require('multer')


const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: 'public/images',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
        + path.extname(file.originalname))
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.match(/\.(png|jpg)$/)) {
    //   // upload only png and jpg format
    //   return cb(new Error('Please upload a Image'))
    // }
    cb(undefined, true)
  }
})

router.get('/', function(req, res, next) {
  mysqlpool.getConnection(function(err, connection) {
    connection.query(`SELECT * FROM game_play_details`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      return res.json({success: true, data: results });
    });
  });
});

router.post('/', function(req, res, next) {
  mysqlpool.getConnection(function(err, connection) {
    connection.query(`INSERT INTO game_play_details (booth_name, price_per_hour, 
        special_feature, image, customer_name, starting_time, ending_time, status) 
        VALUES ("${req.body.booth_name}", "${req.body.price_per_hour}", "${req.body.special_feature}", 
        "${req.body.image}", "${req.body.customer_name}", "${req.body.starting_time}", 
        "${req.body.ending_time}", '0')`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      return res.json({success: true, data: results });
    });
  });
});

router.patch('/:id', function(req, res, next) {
  mysqlpool.getConnection(function(err, connection) {
    const sql = `UPDATE game_play_details SET customer_name = "${req.body.customer_name}", 
    starting_time="${req.body.starting_time}", ending_time="${req.body.ending_time}", status="${req.body.status}"  WHERE id="${req.params.id}"`
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      return res.json({success: true, data: results });
    });
  });
});

router.patch('/stop/:id', function(req, res, next) {
  mysqlpool.getConnection(function(err, connection) {
    const sql = `UPDATE game_play_details SET customer_name = null, 
    starting_time= 0, ending_time=0, status=0  WHERE id="${req.params.id}"`
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      return res.json({success: true, data: results });
    });
  });
});

router.post('/uploadImage/:id', imageUpload.single('image'), (req, res) => {
  mysqlpool.getConnection(function(err, connection) {
    const sql = `UPDATE game_play_details SET image = "${req.file.filename}"  WHERE id="${req.params.id}"`
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      // return res.json({success: true, data: results });
    });
  });
  res.send(req.file)

}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})



module.exports = router;
