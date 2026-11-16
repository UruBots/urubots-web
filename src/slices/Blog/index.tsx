import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import type {Blog as BlogType} from "@/components/types/Blog";
import {BlogList} from '@/components/BlogList';

/**
 * Props for `Blog`.
 */
export type BlogProps = SliceComponentProps<Content.BlogSlice>;

/**
 * Component for "Blog" Slices.
 */
const Blog = ({ slice }: BlogProps): React.JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
     <BlogList slice={slice} />
    </section>
  );
};

export default Blog;
