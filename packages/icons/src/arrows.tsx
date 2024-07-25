
type IconProps = React.HTMLAttributes<SVGElement>;
export const arrows = {
    arrowRight: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M5 12l14 0" />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </svg>
      ),
      arrowLeft: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
      )
      


}

      