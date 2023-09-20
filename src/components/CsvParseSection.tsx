import { Parser } from '@json2csv/plainjs';
import { useDeferredValue, useEffect, useState } from 'react';
import {
  Button,
  Textarea,
  Snippet,
  Accordion,
  AccordionItem,
} from '@nextui-org/react';
import Space from './Space';

import { loadScript } from '../utils';

export function CsvParseSection() {
  const [csvString, setCsvString] = useState(' ');
  const deferredCsvString = useDeferredValue(csvString);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jsonString = e.currentTarget.json.value;
    const parser = new Parser({});
    const csv = parser.parse(
      eval(`var ISODate = v => dayjs(v).toString();(${jsonString})`),
    );
    setCsvString(csv);
  };

  // TODO: date format시에만 load해서 사용하도록 처리
  loadScript('https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js').get();

  return (
    <Space className="w-full" gap={8}>
      <form className="flex-grow w-full" onSubmit={handleSubmit}>
        <Textarea
          name="json"
          label="JSON String"
          placeholder={
            '[{ "_id" : "0", createdAt: ISODate("2023-01-01T15:00:00.000Z")}]'
          }
        />
        <Button type="submit" color="primary">
          Convert
        </Button>

        <Accordion variant="bordered">
          <AccordionItem key="1" aria-label="Accordion 1" title="Options">
            test
          </AccordionItem>
        </Accordion>
      </form>
      <div className="flex-grow w-full">
        <Snippet
          className="w-full relative min-h-unit-11"
          hideSymbol
          classNames={{ copyButton: 'absolute right-3 top-1.5' }}
        >
          <pre>{deferredCsvString}</pre>
        </Snippet>
      </div>
    </Space>
  );
}

export default CsvParseSection;
