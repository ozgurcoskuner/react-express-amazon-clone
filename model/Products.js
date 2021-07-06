const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
      },
    title:  {
        type: String,
        required: true
      },
    url:  {
        type: String,
        required: true
      },
    description:  {
        type: Array,
        required: true
      },
    price:  {
        type: Number,
        required: true
      },
})

module.exports = mongoose.model('Product', productSchema)