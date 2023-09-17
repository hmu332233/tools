import { Parser } from '@json2csv/plainjs';
import { useDeferredValue, useState } from 'react';
import { Button, Textarea, Snippet } from '@nextui-org/react';
import Space from './Space';

export function CsvParseSection() {
  const [csvString, setCsvString] = useState('');
  const deferredCsvString = useDeferredValue(csvString);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jsonString = e.currentTarget.json.value;
    const parser = new Parser({});
    const csv = parser.parse(JSON.parse(jsonString));
    setCsvString(csv);
  };

  return (
    <Space className="w-full" gap={8}>
      <form className="flex-grow w-full" onSubmit={handleSubmit}>
        <Textarea
          name="json"
          label="JSON String"
          placeholder={'[{ "a" : 1 }, { "a" : 2 }]}]'}
        />
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
      <div className="flex-grow w-full">
        <Snippet className="w-full" hideSymbol>
          <pre>{deferredCsvString}</pre>
        </Snippet>
      </div>
    </Space>
  );
}

export default CsvParseSection;
