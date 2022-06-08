import mongoose from "mongoose";

const storeSchema = mongoose.Schema({
    name: String,
    phone: Number,
    address: String
})

export default mongoose.model('store', storeSchema)