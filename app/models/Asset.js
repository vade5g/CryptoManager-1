const mongoose = require('mongoose');

let AssetSchema = new mongoose.Schema({
    name:{
        type:String,
    required: true
    },
    buyvalue:{
        type:Number,
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
});

let Asset = module.exports = mongoose.model('Asset', AssetSchema);