import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { DonationsContent as DonationsContentComponent } from "@/components/DonationsContent";

const DonationsContent: FC<SliceComponentProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={(slice as any).slice_type}
      data-slice-variation={(slice as any).variation}
    >
      <DonationsContentComponent slice={slice} />
    </section>
  );
};

export default DonationsContent;
