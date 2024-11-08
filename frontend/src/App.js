
import React from 'react';
import CodeGeneration from './components/CodeGeneration';
import TemplateManagement from './components/TemplateManagement';
import LibraryManagement from './components/LibraryManagement';

const App = () => {
    return (
        <div>
            <h1>Welcome to the Decentralized Platform</h1>
            <CodeGeneration />
            <TemplateManagement />
            <LibraryManagement />
        </div>
    );
};

export default App;
