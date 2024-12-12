import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import User from './models/User.js';
import Combo from './models/Combo.js';
import Card from './models/Card.js';
import Purchase from './models/Purchase.js';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5500',
  ]
}));
app.use(express.json());

app.get('/', (req, res) => {});

app.get('/films', (req, res) => {});

app.get('/users', async (req, res) => {
  const users = await User.find().exec();
  return res.json(users);
});
 

// Rota para finalizar a compra
app.post('/finalize-purchase', async (req, res) => {
  const { cart, userId } = req.body;

  try {
    // Verificar o estoque e atualizar
    for (const item of cart) {
      const combo = await Combo.findOne({ name: item.name });
      if (!combo || combo.quant < item.quantity) {
        return res.status(400).send({ message: `Estoque insuficiente para ${item.name}` });
      }
      combo.quant -= item.quantity;
      await combo.save();
    }

    // Criar o registro da compra
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const purchase = new Purchase({ userId, cart, total, date: new Date() });
    await purchase.save();

    res.status(200).send({ message: 'Compra realizada com sucesso!', purchase });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao finalizar compra', error });
  }
});


// Rota para listar todos os cartões
app.get('/list-cards', async (req, res) => {
  try {
    const cards = await Card.find(); // Busca todos os cartões no banco
    res.status(200).json(cards); // Retorna os cartões em formato JSON
  } catch (error) {
    res.status(500).send({ message: 'Erro ao listar cartões', error });
  }
});


// Rota para deletar um cartão
app.delete('/delete-card/:id', async (req, res) => {
  console.log('Rota DELETE /delete-card/:id chamada'); // Adicionando log
  const { id } = req.params;

  try {
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Cartão não encontrado' });
    }
    await card.remove();
    return res.status(200).json({ message: 'Cartão excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir cartão:', error);
    return res.status(500).json({ message: 'Erro ao excluir cartão' });
  }
});






// Endpoint para adicionar cartão
app.post('/add-card', async (req, res) => {
  try {
    const { cardNumber, cardName, cardExpiration, cardCVV } = req.body;

    if (!cardNumber || !cardName || !cardExpiration || !cardCVV) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Criar e salvar o cartão
    const newCard = new Card({ cardNumber, cardName, cardExpiration, cardCVV });
    await newCard.save();

    res.status(201).json({ message: "Cartão cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar cartão:", error);
    res.status(500).json({ message: "Erro ao adicionar cartão." });
  }
});




app.post('/signup', async (req, res) => {
  const { username = '', name = '', password = '', role = 'user' } = req.body;
  const newUser = {
    username,
    name,
    password,
    role,
  };

  try {
    const userExists = await User.find({ username }).exec();
    if (userExists.length) return res.json("User already exists");

    const result = await User.create(newUser);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

app.post('/login', async (req, res) => {
  const { username = '', password = '' } = req.body;

  const result = await User.find({ username, password }).exec();
  return res.json(result);
});

app.post('/add-combo', async (req, res) => {
  try {
      const { name, description, price, quant } = req.body;

      // Validação: Verifica se todos os campos estão presentes
      if (!name || !description || !price || quant === undefined) {
          return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      // Criar combo no banco de dados
      const combo = await Combo.create({ name, description, price, quant });
      res.status(201).json(combo);
  } catch (error) {
      console.error('Erro ao adicionar combo:', error);
      res.status(500).json({ message: 'Erro ao adicionar combo.' });
  }
});


app.get('/list-combos', async (req, res) => {
  const combos = await Combo.find().exec();
  return res.json(combos);
});

app.delete('/delete-users', async (req, res) => {
  const oi = await User.deleteMany();
  return res.json(oi);
});

app.delete('/delete-combo/:id', async (req, res) => {
  const { id = '' } = req.params;

  const result = await Combo.deleteOne({ _id: id }).exec();
  return res.json(result);
});

// Método para comprar combo, id pelo nome
app.post('/buy-combo/:name', async (req, res) => {
  const { name } = req.params;
  const { quantity } = req.body; // Quantidade a ser comprada

  try {
    const combo = await Combo.findById(name);
    if (!combo) {
      return res.status(404).json({ message: 'Combo not found' });
    }

    if (combo.quant < quantity) {
      return res.status(400).json({ message: 'Not enough stock' });
    }

    combo.quant -= quantity; // Atualiza o estoque
    await combo.save();

    return res.json({ message: 'Sucesso!', combo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

mongoose.connect('mongodb://localhost:27017/test')
  .then(() => console.log('DB deu bom'))
  .catch(() => console.log('DB deu ruim'));
