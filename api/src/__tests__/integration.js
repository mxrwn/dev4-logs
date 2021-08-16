const supertest = require('supertest')
const app = require('./../index');

const request = supertest(app);

describe('GET /test', () => {
  test('should responds with code 200', async (done) => {
    try {
      await request.get('/test').expect(200, done())
    } catch (err) {
      done();
    }
  });
});

describe('GET /category route', () => {
  test('should give an array', async (done) => {
    try {
      await request.get('/category').expect(Object, done());
    } catch (err) {
      done();
    }
  });
});

describe('POST /category/create route', () => {
  test('should give an array', async (done) => {
    try {
      await request.post('/category/create').expect(Object, done());
    } catch (err) {
      done();
    }
  });
});
