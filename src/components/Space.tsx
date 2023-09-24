import cn from 'classnames';

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  direction?: 'row' | 'col';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  // prettier-ignore
  gap?: 0 | "px" | 2 | 1 | 0.5 | 1.5 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

function Space({
  tag: Tag = 'div',
  className = '',
  direction = 'row',
  justify = 'start',
  align = 'start',
  gap = 0,
  children,
  ...props
}: Props) {
  return (
    <Tag
      className={cn(
        'flex',
        `flex-${direction}`,
        `justify-${justify}`,
        `align-${align}`,
        `gap-${gap}`,
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Space;
