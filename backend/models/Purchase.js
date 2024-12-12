import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cart: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

export default Purchase;  // Exportação padrão ES6
