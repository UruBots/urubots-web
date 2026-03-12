import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { ResearchPublications as ResearchPublicationsContent } from "@/components/ResearchPublications";

const ResearchPublications = ({
  slice,
}: SliceComponentProps<Content.ResearchPublicationsSlice>) => {
  const title = slice.primary.title || "Research Publications";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ResearchPublicationsContent title={title} slice={slice} />
    </section>
  );
};

export default ResearchPublications;
