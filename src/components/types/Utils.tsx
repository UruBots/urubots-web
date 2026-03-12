import React from 'react';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: '8xl' | '6xl' | '2xl';
  children: React.ReactNode;
  className?: string;
}

interface PrismicRichTextProps {
  components?: HeadingProps;
  field: any;
  [key: string]: any;
}

interface DefaultProps {
  children: React.ReactNode;
}

interface ContentProps {
  children: React.ReactNode;
  node: any;
}

export type { HeadingProps, PrismicRichTextProps, DefaultProps, ContentProps };
