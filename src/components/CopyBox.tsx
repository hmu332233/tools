import cn from 'classnames';

import { Snippet, ScrollShadow } from '@nextui-org/react';

type Props = {
  className?: string;
  value: string;
};

function CopyBox({ className, value }: Props) {
  return (
    <Snippet
      className={cn('relative min-h-unit-11', className)}
      hideSymbol
      classNames={{ copyButton: 'absolute right-3 top-1.5' }}
      codeString={value}
    >
      <ScrollShadow className="max-h-80">
        <pre>{value}</pre>
      </ScrollShadow>
    </Snippet>
  );
}

export default CopyBox;
