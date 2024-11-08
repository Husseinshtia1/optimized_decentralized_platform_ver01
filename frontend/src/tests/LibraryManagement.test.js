
import React from 'react';
import { render, screen } from '@testing-library/react';
import LibraryManagement from '../components/LibraryManagement';
import axios from 'axios';

jest.mock('axios');

test('renders LibraryManagement component', () => {
    render(<LibraryManagement />);
    const heading = screen.getByText(/Library Management/i);
    expect(heading).toBeInTheDocument();
});

test('displays libraries', async () => {
    const libraries = [
        { _id: '1', name: 'Library A', version: '1.0', description: 'Description A', repository: 'http://repo-a.com' },
        { _id: '2', name: 'Library B', version: '2.0', description: 'Description B', repository: 'http://repo-b.com' },
    ];
    axios.get.mockResolvedValueOnce({ data: libraries });

    render(<LibraryManagement />);

    const libraryA = await screen.findByText(/Library A/i);
    const libraryB = await screen.findByText(/Library B/i);
    expect(libraryA).toBeInTheDocument();
    expect(libraryB).toBeInTheDocument();
});
