const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');


const PosterSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },  
});

PosterSchema.plugin(mongoosePaginate);

const Poster = mongoose.model('Poster', PosterSchema);

module.exports = Poster;