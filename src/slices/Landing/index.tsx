import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { Landing as LandingComponent } from '@/components/Landing';

/**
 * Props for `Landing`.
 */
export type LandingProps = SliceComponentProps<Content.LandingSlice>;

/**
 * Component for "Landing" Slices.
 */
const Landing = ({ slice }: LandingProps): React.JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <LandingComponent slice={slice} />
    </section>
  );
};

export default Landing;
