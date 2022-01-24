import mongoose from 'mongoose';

const categorySchema =  mongoose.Schema({
    category: [String]
});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;