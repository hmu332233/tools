import { Suspense } from 'react';
import CsvParseSection from './components/CsvParseSection';
import Navbar from './components/Navbar';
import Space from './components/Space';

function App() {
  return (
    <>
      <Navbar />
      <Space className="min-h-screen py-9 mx-auto max-w-5xl px-6">
        <Suspense fallback={<div>Loading...</div>}>
          <CsvParseSection />
        </Suspense>
      </Space>
    </>
  );
}

export default App;
