import express from 'express';
import { keys } from './sources/keys.js';
import fetch from 'node-fetch';

const app = express();

// Init express
app.use(express.json());

// Create your endpoints/route handlers
app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;

  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`;

  try {
    const fetch_response = await fetch(api_url);
    const data = await fetch_response.json();
    const temp = data.main.temp;
    res.json({
      cityName: data.name,
      temperature: `${data.main.temp} °F`,
    });
  } catch (error) {
    console.log(error);
  }

  if (cityName === '') {
    res.status(400).json({ weatherText: 'City is not found!' });
  }
});

export default app;
