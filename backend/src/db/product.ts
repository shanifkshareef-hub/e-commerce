import mongoose from 'mongoose';

// Product Config
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

export const ProductModel = mongoose.model('Product', ProductSchema);

// Product Actions
export const getAll = () => ProductModel.find();
export const getOne = (id: string) => ProductModel.findById(id);
export const create = (values: Record<string, any>) => new ProductModel(values).save().then((product) => product.toObject());
export const update = (id: string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values);
export const deleteOne = (id: string) => ProductModel.findOneAndDelete({ _id: id });
