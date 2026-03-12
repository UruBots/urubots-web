import { Content, asLink } from "@prismicio/client";
import {PrismicRichText} from "@/components/Utils/PrismicRichText";
interface Props {
  slice: Content.DonationsContentSlice;
}

export const DonationsContent = ({ slice }: Props) => {
  if (!slice || !slice.primary) {
    return null;
  }

  const title = slice.primary.title || "How to Help";
  const description = slice.primary.description;
  const contactLinkText = slice.primary.contact_link_text || "Contact Us";
  const contactUrl = asLink(slice.primary.contact_link) || "/contact";

  return (
    <section className="pt-20 pb-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px] mb-4">
            {title}
          </h2>
          <div className="h-1 w-20 bg-primary rounded"></div>
        </div>

        {description && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-gray-700 dark:text-gray-300 leading-relaxed">
            <PrismicRichText field={description} />
          </div>
        )}

        <div className="mt-10">
          <a
            href={contactUrl}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-black dark:text-white bg-primary rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/30"
          >
            {contactLinkText}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
