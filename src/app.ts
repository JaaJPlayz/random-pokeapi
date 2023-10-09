const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

// Root route
app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

// Get a random pokemon
app.get('/api/random/pokemon', (req: any, res: any) => {
  axios
    .get('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then((response: any) => {
      const pokemon = response.data.results;
      const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
      res.send(randomPokemon);
    })
    .catch((error: any) => {
      console.log(error);
    });
});

// Get a specific pokemon
app.get('/api/pokemon/:pokemon', (req: any, res: any) => {
  const pokemon = req.params.pokemon;
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response: any) => {
      res.send(response.data);
    })
    .catch((error: any) => {
      console.log(error);
    });
});

// get the desired amount of random pokemon
app.get('/api/random/pokemon/:amount', (req: any, res: any) => {
  const amount = req.params.amount;
  if (amount > 100 || amount < 1) {
    res.send('Please enter a number between 1 and 100');
    return;
  };
  axios
    .get('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then((response: any) => {
      const pokemon = response.data.results;
      const randomPokemon: Array<any> = [];
      for (let i = 0; i < amount; i++) {
        randomPokemon.push(pokemon[Math.floor(Math.random() * pokemon.length)]);
      }
      res.send(randomPokemon);
    })
    .catch((error: any) => {
      console.log(error);
    });
});

// Setup server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
