import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {ColumnImageRight} from "@/components/ColumnImageRight";

/**
 * Props for `SectionImageRight`.
 */
export type SectionImageRightProps =
  SliceComponentProps<Content.SectionImageRightSlice>;

/**
 * Component for "SectionImageRight" Slices.
 */
const SectionImageRight = ({ slice }: SectionImageRightProps): React.JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ColumnImageRight slice={slice.primary} />
    </section>
  );
};

export default SectionImageRight;
