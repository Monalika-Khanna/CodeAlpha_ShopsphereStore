import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, name: String, image: String, price: Number, quantity: Number }],
  shippingAddress: { fullName: String, email: String, phone: String, address: String, city: String, postalCode: String },
  totalAmount: { type: Number, required: true, min: 0 },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' }
}, { timestamps: true });
export default mongoose.model('Order', orderSchema);
