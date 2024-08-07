import { STROKE_WIDTH } from ".";
import type { IconProps } from ".";

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
      ),
      arrowUp: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5l0 14" />
          <path d="M18 11l-6 -6" />
          <path d="M6 11l6 -6" />
        </svg>
      ),
      arrowDown: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5l0 14" />
          <path d="M18 13l-6 6" />
          <path d="M6 13l6 6" />
        </svg>
      ),
      arrowDownRight: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7l10 10" />
          <path d="M17 8l0 9l-9 0" />
        </svg>
      ),
      arrowDownLeft: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 7l-10 10" />
          <path d="M16 17l-9 0l0 -9" />
        </svg>
      ),
      arrowUpLeft: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7l10 10" />
          <path d="M16 7l-9 0l0 9" />
        </svg>
      ),
      arrowUpRight: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 7l-10 10" />
          <path d="M8 7l9 0l0 9" />
        </svg>
      )
      
      
      
      


}

      