import { StreamParser } from '@json2csv/plainjs';
import { useDeferredValue, useEffect, useState } from 'react';

function LoadTest() {
  const [csvString, setCsvString] = useState('');
  const deferredCsvString = useDeferredValue(csvString);

  // parser.onEnd = () => console.log(csv);

  // You can also listen for events on the conversion and see how the header or the lines are coming out.
  // parser.onHeader = (header) => console.log(header);
  // parser.onLine = (line) => console.log(line);

  useEffect(() => {
    const parser = new StreamParser({
      ndjson: true,
    });
    parser.onData = (chunk) => {
      console.log(chunk);
      setCsvString((v) => (v += chunk.toString()));
    };
    parser.onError = (err) => console.error(err);
    parser.write('[{"a":1},{"a":2}]');
    // parser.end();
  }, []);
  return <div>{JSON.stringify(csvString)}</div>;
}

export default LoadTest;
