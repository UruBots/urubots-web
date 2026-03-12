import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { DonationsContent as DonationsContentComponent } from "@/components/DonationsContent";

const DonationsContent = ({
  slice,
}: SliceComponentProps<Content.DonationsContentSlice>) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <DonationsContentComponent slice={slice} />
    </section>
  );
};

export default DonationsContent;
