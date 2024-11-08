
// backend/tests/roleMiddleware.test.js
const request = require('supertest');
const express = require('express');
const roleMiddleware = require('../middleware/roleMiddleware');

const app = express();

// Sample protected route
app.get(
  '/admin',
  roleMiddleware(['admin']),
  (req, res) => res.send('Admin Access Granted')
);

describe('Role Middleware', () => {
  it('should allow access for admin role', (done) => {
    const req = { user: { role: 'admin' } };
    app.request = req;

    request(app)
      .get('/admin')
      .expect(200, 'Admin Access Granted', done);
  });

  it('should deny access for non-admin role', (done) => {
    const req = { user: { role: 'user' } };
    app.request = req;

    request(app)
      .get('/admin')
      .expect(403, done);
  });
});
