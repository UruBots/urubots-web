import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { ResearchPublications as ResearchPublicationsContent } from "@/components/ResearchPublications";

const ResearchPublications: FC<SliceComponentProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={(slice as any).slice_type}
      data-slice-variation={(slice as any).variation}
    >
      <ResearchPublicationsContent slice={slice} />
    </section>
  );
};

export default ResearchPublications;
