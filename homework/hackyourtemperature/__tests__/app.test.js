/* Have a look at your JavaScript code to remind yourself what describe, 
it and expect did again and set up a simple test:
*/

import app from '../app.js';
import supertest from 'supertest';
const request = supertest(app);

describe('GET /', () => {
  describe('hello from backend to frontend!', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request.get('/').send();
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('POST /weather/cityName', () => {
  describe('given a city name', () => {
    it('responds with a 200 status code', async () => {
      const response = await request
        .post('/weather')
        .send({ cityName: 'London' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('cityName', 'London');
      expect(response.body).toHaveProperty('temperature');
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
    });
  });
});

describe('POST /weather/cityName', () => {
  describe('given no city name', () => {
    it('responds with a 400 status code', async () => {
      const response = await request.post('/weather/').send({ cityName: '' });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty(
        'weatherText',
        'Missing the city name.',
      );
    });
  });
});
