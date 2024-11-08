
// frontend/tests/UserProfile.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from '../components/UserProfile';

test('renders user profile and allows editing', () => {
  render(<UserProfile userId={1} />);
  
  const nameInput = screen.getByPlaceholderText('Name');
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  
  expect(nameInput.value).toBe('John Doe');
});
