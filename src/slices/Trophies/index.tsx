import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Trophies as TrophiesContent } from "@/components/Trophies";

export type TrophiesProps = SliceComponentProps<Content.TrophiesSlice>;

const Trophies: FC<TrophiesProps> = ({ slice }) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <TrophiesContent title={slice.primary.title} subtitle={slice.primary.subtitle} items={slice.items} />
    </section>
  );
};

export default Trophies;
