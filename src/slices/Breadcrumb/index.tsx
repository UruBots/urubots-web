import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import {Breadcrumb as BreadcrumbComponent} from "@/components/Common/Breadcrumb";

/**
 * Props for `Breadcrumb`.
 */
export type BreadcrumbProps = SliceComponentProps<Content.BreadcrumbSlice>;

/**
 * Component for "Breadcrumb" Slices.
 */
const Breadcrumb = ({ slice }: BreadcrumbProps): React.JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
        <BreadcrumbComponent
            pageName="Contact Page"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
        />
    </section>
  );
};

export default Breadcrumb;
