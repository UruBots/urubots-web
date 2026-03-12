import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText as BasePrismicRichText } from '@prismicio/react';
import {PrismicRichTextProps, DefaultProps, ContentProps} from '@/components/types/Utils';

const defaultComponents = {
  paragraph: ({ children }: DefaultProps) => (
    <p className='mb-7 last:mb-0'>{children}</p>
  ),
  oList: ({ children }: DefaultProps) => (
    <ol className='mb-7 pl-4 last:mb-0 md:pl-6'>{children}</ol>
  ),
  oListItem: ({ children }: DefaultProps) => (
    <li className='mb-1 list-decimal pl-1 last:mb-0 md:pl-2'>{children}</li>
  ),
  list: ({ children }: DefaultProps) => (
    <ul className='mb-7 pl-4 last:mb-0 md:pl-6'>{children}</ul>
  ),
  listItem: ({ children }: DefaultProps) => (
    <li className='mb-1 list-disc pl-1 last:mb-0 md:pl-2'>{children}</li>
  ),
  preformatted: ({ children }: DefaultProps) => (
    <pre className='mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg'>
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }: DefaultProps) => (
    <strong className='font-semibold'>{children}</strong>
  ),
  hyperlink: ({ children, node }: ContentProps) => (
    <PrismicNextLink
      field={node.data}
      className='underline decoration-1 underline-offset-2'
    >
      {children}
    </PrismicNextLink>
  ),
};

export function PrismicRichText({
  components,
  ...props
}: PrismicRichTextProps) {
  return (
    <BasePrismicRichText
        // @ts-ignore
        components={{...defaultComponents, ...components}}
        {...props}    />
  );
}
