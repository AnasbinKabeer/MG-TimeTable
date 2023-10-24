const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hostname = '0.0.0.0';
const port = 7000;



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));




// Connect to MongoDB
mongoose.connect("mongodb+srv://AnasKabeer:anas123@cluster0.odpuvfa.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Define schema and model for the data
const Schema = mongoose.Schema;
const DataSchema = new Schema({


  resultNo: Number,
  programe: String,
  category: String,
  

  first: String,
  first_winner: String,
  first_winner_father: String,

  second: String,
  second_winner: String,
  second_winner_father: String,

  third: String,
  third_winner: String,
  third_winner_father: String,
  
});
const DataModel = mongoose.model('Data', DataSchema);



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/admin.html');
  });





// Handle form submission
app.post('/submit', function (req, res) {
    const data = new DataModel({

      resultNo: req.body.resultNo,
      programe: req.body.programe,
      category: req.body.category,

      first: req.body.first,
      first_winner: req.body.first_winner,
      first_winner_father: req.body.first_winner_father,

      second: req.body.second,
      second_winner: req.body.second_winner,
      second_winner_father: req.body.second_winner_father,

      third: req.body.third,
      third_winner: req.body.third_winner,
      third_winner_father: req.body.third_winner_father,
  
    })
  
    data.save()
      .then(() => {
        res.sendFile(__dirname + '/index.html');
  
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving data to MongoDB');
      });
  });
  


// Retrieve data from MongoDB
app.get('/data', function (req, res) {
    DataModel.find({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving data from MongoDB');
      });
  });


// Start the server
app.listen(port, hostname, function () {
  console.log('Server is running on http://localhost:3000');
});
