import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { getPublications } from "@/lib/publications";
import { PublicationsList } from "@/components/PublicationsList";

export type ResearchPublicationsProps = SliceComponentProps<Content.ResearchPublicationsSlice>;

/**
 * Lists the `publication` documents of the page's locale (English copy as fallback). UI texts come from
 * this slice's fields, which editors translate per locale in the research page.
 */
const ResearchPublications = async ({ slice, context }: ResearchPublicationsProps) => {
  const client = createClient();
  const publications = await getPublications(client, (context as { lang?: string })?.lang);
  const p = slice.primary;

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <PublicationsList
        publications={publications}
        title={p.title}
        labels={{
          all: p.filter_all_label ?? "",
          paper: p.filter_papers_label ?? "",
          tdp: p.filter_tdps_label ?? "",
          copy: p.copy_bibtex_label ?? "",
          copied: p.copied_label ?? "",
          accepted: p.accepted_label ?? "",
          preprint: p.preprint_label ?? "",
        }}
      />
    </section>
  );
};

export default ResearchPublications;
