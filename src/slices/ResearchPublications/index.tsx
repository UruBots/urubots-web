import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { fromPrismic } from "@/lib/publications";
import { DEFAULT_LOCALE } from "@/lib/locales";
import { PublicationsList } from "@/components/PublicationsList";

export type ResearchPublicationsProps = SliceComponentProps<Content.ResearchPublicationsSlice>;

/**
 * Lists every `publication` document (English master copy). UI texts come from
 * this slice's fields, which editors translate per locale in the research page.
 */
const ResearchPublications = async ({ slice }: ResearchPublicationsProps) => {
  const client = createClient();
  const docs = await client.getAllByType("publication", { lang: DEFAULT_LOCALE });
  const publications = docs.map(fromPrismic);
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
