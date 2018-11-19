const mongoose = require('mongoose');


mongoose.connect('mongodb://admin:admin123@ds239703.mlab.com:39703/negocioamigo', {useNewUrlParser: true});

mongoose.Promise = global.Promise;

module.exports = mongoose;