import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  cardName: { type: String, required: true },
  cardExpiration: { type: String, required: true },
  cardCVV: { type: String, required: true }
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
