var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

var app = express();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post(
  '/api/fileanalyse',
  upload.single('upfile'),
  function (req, res, next) {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
