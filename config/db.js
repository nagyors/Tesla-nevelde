const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/p28rw9',{useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;