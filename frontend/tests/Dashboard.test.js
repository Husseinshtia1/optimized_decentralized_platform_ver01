
// frontend/tests/Dashboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

test('renders dashboard with welcome message', () => {
  render(<Dashboard />);
  const heading = screen.getByText(/Welcome to your Dashboard/i);
  expect(heading).toBeInTheDocument();
});
