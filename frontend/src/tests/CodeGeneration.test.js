
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CodeGeneration from '../components/CodeGeneration';
import axios from 'axios';

jest.mock('axios');

test('renders CodeGeneration component', () => {
    render(<CodeGeneration />);
    const heading = screen.getByText(/Code Generation Tool/i);
    expect(heading).toBeInTheDocument();
});

test('generates code when form is submitted', async () => {
    axios.post.mockResolvedValueOnce({ data: { code: 'console.log("Hello World");' }});
    
    render(<CodeGeneration />);
    
    fireEvent.change(screen.getByLabelText(/Programming Language:/i), { target: { value: 'JavaScript' }});
    fireEvent.change(screen.getByLabelText(/Prompt:/i), { target: { value: 'Create a hello world program.' }});
    
    fireEvent.click(screen.getByText(/Generate Code/i));
    
    const generatedCode = await screen.findByText(/console.log("Hello World");/i);
    expect(generatedCode).toBeInTheDocument();
});

test('shows error message when API call fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Error generating code'));
    
    render(<CodeGeneration />);
    
    fireEvent.change(screen.getByLabelText(/Programming Language:/i), { target: { value: 'JavaScript' }});
    fireEvent.change(screen.getByLabelText(/Prompt:/i), { target: { value: 'Create a hello world program.' }});
    
    fireEvent.click(screen.getByText(/Generate Code/i));
    
    const errorMessage = await screen.findByText(/Error generating code. Please try again./i);
    expect(errorMessage).toBeInTheDocument();
});
