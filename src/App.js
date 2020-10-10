import React from 'react';

import MainComp from './components/Main/MainComp';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <ContextProvider>
        <div>
          <MainComp/>
        </div>
    </ContextProvider>
  );
}

export default App;