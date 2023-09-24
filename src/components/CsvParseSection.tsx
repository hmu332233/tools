import { Parser } from '@json2csv/plainjs';
import { useDeferredValue, useState } from 'react';
import { Button, Textarea, Input } from '@nextui-org/react';
import Space from './Space';

import { loadScript } from '../utils';
import CopyBox from './CopyBox';

export function CsvParseSection() {
  const [csvString, setCsvString] = useState(' ');
  const deferredCsvString = useDeferredValue(csvString);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jsonString = e.currentTarget.jsonString.value;
    const dateFormat = e.currentTarget.dateFormat.value;
    const parser = new Parser({});
    const csv = parser.parse(
      eval(
        `var ObjectId = v => v;var ISODate = v => dayjs(v).format('${dateFormat}');(${jsonString})`,
      ),
    );
    setCsvString(csv);
  };

  // TODO: date format시에만 load해서 사용하도록 처리
  loadScript('https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js').get();

  return (
    <Space
      tag="form"
      className="w-full"
      direction="col"
      gap={8}
      onSubmit={handleSubmit}
    >
      <Space className="w-full" gap={8}>
        <div className="flex-grow w-full">
          <Textarea
            name="jsonString"
            label="JSON String"
            placeholder={
              '[{ "_id" : ObjectId("650efd700000000000000000"), createdAt: ISODate("2023-01-01T15:00:00.000Z")}]'
            }
          />
          <Button type="submit" color="primary">
            Convert
          </Button>
        </div>
        <div className="flex-grow w-full">
          <CopyBox className="w-full" value={deferredCsvString} />
        </div>
      </Space>
      <Space className="w-full" gap={8}>
        <Input
          name="dateFormat"
          type="text"
          label="Date Format"
          placeholder="YYYY-MM-DD"
          defaultValue="YYYY-MM-DDTHH:mm:ss.SSS[Z]"
        />
      </Space>
    </Space>
  );
}

export default CsvParseSection;
