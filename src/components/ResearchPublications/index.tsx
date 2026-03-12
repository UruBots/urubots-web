import * as prismic from "@prismicio/client";

interface PublicationItem {
  publication_title: string;
  year: number;
  link: prismic.LinkField;
}

export const ResearchPublications = ({ slice }: any) => {
  if (!slice) {
    return null;
  }

  const title = (slice as any).primary?.title || "Research Publications";
  const items: PublicationItem[] = slice.items || [];

  if (items.length === 0) {
    return (
      <section className="pt-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <p className="text-center text-body-color dark:text-body-color-dark text-lg">
            No publications found.
          </p>
        </div>
      </section>
    );
  }

  const groupedPublications = items.reduce(
    (acc, pub) => {
      const year = pub.year || 0;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(pub);
      return acc;
    },
    {} as Record<number, PublicationItem[]>,
  );

  const years = Object.keys(groupedPublications)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section className="pt-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px] mb-4">
            {title}
          </h2>
          <div className="h-1 w-20 bg-primary rounded"></div>
        </div>

        {years.map((year) => (
          <div key={year} className="mb-12 last:mb-0">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-200 dark:border-gray-500 pb-2">
              {year}
            </h3>
            <ul className="space-y-4">
              {groupedPublications[year].map((pub, idx) => {
                const url = prismic.asLink(pub.link) || "#";
                return (
                  <li key={`${pub.publication_title}-${idx}`} className="group">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                    >
                      <div className="flex items-start">
                        <div className="mr-4 mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                        <div>
                          <h4 className="text-lg font-medium text-black dark:text-white group-hover:text-primary transition-colors leading-relaxed">
                            {pub.publication_title}
                          </h4>
                          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary/80 transition-colors">
                            <svg
                              className="w-4 h-4 mr-1.5 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              ></path>
                            </svg>
                            <span className="truncate">{url}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
