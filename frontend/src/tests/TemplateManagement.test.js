
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TemplateManagement from '../components/TemplateManagement';
import axios from 'axios';

jest.mock('axios');

test('renders TemplateManagement component', () => {
    render(<TemplateManagement />);
    const heading = screen.getByText(/Template Management/i);
    expect(heading).toBeInTheDocument();
});

test('adds a new template', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.post.mockResolvedValueOnce({ data: { _id: '1', name: 'Test Template', content: 'console.log("Test");' }});

    render(<TemplateManagement />);
    fireEvent.change(screen.getByPlaceholderText(/Template Name/i), { target: { value: 'Test Template' }});
    fireEvent.change(screen.getByPlaceholderText(/Template Content/i), { target: { value: 'console.log("Test");' }});

    fireEvent.click(screen.getByText(/Add Template/i));

    const templateName = await screen.findByText(/Test Template/i);
    expect(templateName).toBeInTheDocument();
});

test('deletes a template', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ _id: '1', name: 'Test Template', content: 'console.log("Test");' }] });
    axios.delete.mockResolvedValueOnce({});

    render(<TemplateManagement />);
    const deleteButton = await screen.findByText(/Delete/i);
    fireEvent.click(deleteButton);

    const templateName = screen.queryByText(/Test Template/i);
    expect(templateName).not.toBeInTheDocument();
});
