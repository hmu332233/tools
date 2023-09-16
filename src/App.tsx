import { Suspense, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from '@nextui-org/react';
import LoadTest from './components/LoadTest';

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoadTest />
      </Suspense>
      <Button color="primary">Hello</Button>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
