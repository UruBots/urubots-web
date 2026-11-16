import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {ColumnImageLeft} from "@/components/ColumnImageLeft";

/**
 * Props for `SectionImageLeft`.
 */
export type SectionImageLeftProps =
  SliceComponentProps<Content.SectionImageLeftSlice>;

/**
 * Component for "SectionImageLeft" Slices.
 */
const SectionImageLeft = ({ slice }: SectionImageLeftProps): React.JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ColumnImageLeft slice={slice.primary} />
    </section>
  );
};

export default SectionImageLeft;
