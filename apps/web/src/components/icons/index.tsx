import { brands } from "./brands";

type IconProps = React.HTMLAttributes<SVGElement>;



const STROKE_WIDTH = 2;

export const Icons = {
  logo: (props: IconProps) => (
    <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} stroke="currentColor">
<path fillRule="evenodd" clipRule="evenodd" d="M4.99708 7.49041C4.93452 7.67267 4.92763 7.8285 4.97641 7.95791C5.00079 8.02154 5.0379 8.03017 5.08773 7.98379C5.12484 7.94928 5.14605 7.88619 5.15135 7.79453C6.31871 6.2308 7.49403 4.67732 8.6773 3.13409C9.88601 1.55958 11.4165 0.580361 13.2688 0.19644C13.8011 0.0853614 14.3211 0.0201164 14.829 0.00070468C15.0633 -0.00792277 15.2653 0.0627141 15.435 0.212616C15.9439 0.6634 15.9688 1.18428 15.5097 1.77526C13.5058 4.35703 11.4939 6.94095 9.4741 9.52703C9.45991 9.54542 9.45218 9.56807 9.45218 9.59128C9.45218 9.61448 9.45991 9.63688 9.4741 9.65482L15.1566 16.9876C15.1638 16.997 15.1792 17.0156 15.1996 17.0404L15.1996 17.0404C15.3055 17.1689 15.548 17.4629 15.5 17.5C15.5191 18.2127 15.5 18.5 14.5 19C14.5 19 13.5 19.5 13.3118 19.5484C13.1915 19.5479 13.067 19.5463 12.9397 19.5447C12.6377 19.5409 12.3199 19.5369 12.0044 19.5467C11.4128 19.5661 10.7989 19.2766 10.4697 18.835C8.69797 16.457 6.92148 14.0839 5.14022 11.7157C5.13359 11.7011 5.12683 11.6875 5.11994 11.6749C5.12683 11.6875 5.13357 11.7011 5.14019 11.7157L5.08612 11.706C5.05431 11.7017 5.03258 11.7151 5.02091 11.7464L4.99706 11.8144C4.99707 11.8144 4.99707 11.8144 4.99708 11.8144C5.00556 13.995 5.00397 16.1783 4.99231 18.3642C4.99019 18.677 4.93664 18.9099 4.83168 19.0631C4.65514 19.3251 4.36091 19.5403 4.04124 19.5386C3.10502 19.5365 2.12638 19.5381 1.10534 19.5435C0.42305 19.5484 0 19.042 0 18.3691C0.00212055 12.3471 0.00477112 6.2583 0.00795195 0.102617C0.00794802 0.0801557 0.0166102 0.0585899 0.0320756 0.0425571C0.0475411 0.0265243 0.0685747 0.0173047 0.0906535 0.0168809C1.38737 0.00717502 2.66129 0.00879309 3.91242 0.0217343C4.28882 0.0249696 4.57668 0.157077 4.77601 0.418057C4.91809 0.602469 4.98966 0.900655 4.99072 1.31262C4.9992 3.37673 5.00132 5.436 4.99708 7.49041Z" fill="white"/>
<path d="M18.2034 23.1748C19.7107 23.1722 20.9306 22.0387 20.9282 20.6432C20.9258 19.2477 19.702 18.1186 18.1947 18.1213C16.6875 18.124 15.4675 19.2574 15.4699 20.6529C15.4723 22.0484 16.6961 23.1775 18.2034 23.1748Z" fill="#4995ED"/>
</svg>

  ),
  ...brands,
  bell : (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
  </svg>
  ),
  heartHandshake: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  <path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25" />
  <path d="M12.5 15.5l2 2" />
  <path d="M15 13l2 2" />
</svg>
  ),
  alignLeft: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 6l16 0" />
  <path d="M4 12l10 0" />
  <path d="M4 18l14 0" />
</svg>
  ),
  mapPin: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </svg>
),
home: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
  </svg>
),
calendarEvent: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M16 3l0 4" />
      <path d="M8 3l0 4" />
      <path d="M4 11l16 0" />
      <path d="M8 15h2v2h-2z" />
  </svg>
),
sparkles: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
  </svg>
),
logout: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M9 12h12l-3 -3" />
      <path d="M18 15l3 -3" />
  </svg>
),
compass: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M8 16l2 -6l6 -2l-2 6l-6 2" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 3l0 2" />
      <path d="M12 19l0 2" />
      <path d="M3 12l2 0" />
      <path d="M19 12l2 0" />
  </svg>
),
messages: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
      <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
  </svg>
),
dots: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </svg>
),
userSquareRounded: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" />
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
      <path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05" />
  </svg>
),
userShield: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 21v-2a4 4 0 0 1 4 -4h2" />
      <path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  </svg>
),
check: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 12l5 5l10 -10" />
  </svg>
),
chevronDown: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 9l6 6l6 -6" />
  </svg>
),

chevronUp: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 15l6 -6l6 6" />
  </svg>
),
search: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
  </svg>
),
moodSmile: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 10l.01 0" />
      <path d="M15 10l.01 0" />
      <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
  </svg>
),
language: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 5h7" />
      <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
      <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
      <path d="M12 20l4 -9l4 9" />
      <path d="M19.1 18h-6.2" />
  </svg>
),
world: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M11.5 3a17 17 0 0 0 0 18" />
      <path d="M12.5 3a17 17 0 0 1 0 18" />
  </svg>
),
link: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 15l6 -6" />
      <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
      <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
  </svg>
),

share: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M8.7 10.7l6.6 -3.4" />
      <path d="M8.7 13.3l6.6 3.4" />
  </svg>
),
hash: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 9l14 0" />
      <path d="M5 15l14 0" />
      <path d="M11 4l-4 16" />
      <path d="M17 4l-4 16" />
  </svg>
),
at: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
  </svg>
),
paperclip: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
  </svg>
),
phone: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
  </svg>
),
select: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M9 11l3 3l3 -3" />
  </svg>
),
list: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 6l11 0" />
      <path d="M9 12l11 0" />
      <path d="M9 18l11 0" />
      <path d="M5 6l0 .01" />
      <path d="M5 12l0 .01" />
      <path d="M5 18l0 .01" />
  </svg>
),
listCheck: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
      <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
      <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
      <path d="M11 6l9 0" />
      <path d="M11 12l9 0" />
      <path d="M11 18l9 0" />
  </svg>
),
gripVertical: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </svg>
),
photoPlus: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M15 8h.01" />
      <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
      <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
  </svg>
),
plus: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
  </svg>
),
moodPlus: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M20.985 12.528a9 9 0 1 0 -8.45 8.456" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1" />
  </svg>
),
trash: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg>
),
loader: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 6l0 -3" />
    <path d="M16.25 7.75l2.15 -2.15" />
    <path d="M18 12l3 0" />
    <path d="M16.25 16.25l2.15 2.15" />
    <path d="M12 18l0 3" />
    <path d="M7.75 16.25l-2.15 2.15" />
    <path d="M6 12l-3 0" />
    <path d="M7.75 7.75l-2.15 -2.15" />
  </svg>
),
selector: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M8 9l4 -4l4 4" />
    <path d="M16 15l-4 4l-4 -4" />
  </svg>
),
chevronLeft: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M15 6l-6 6l6 6" />
  </svg>
),

chevronRight: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 6l6 6l-6 6" />
  </svg>
),

chevronsLeft: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M11 7l-5 5l5 5" />
    <path d="M17 7l-5 5l5 5" />
  </svg>
),

chevronsRight: (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth={STROKE_WIDTH} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M7 7l5 5l-5 5" />
    <path d="M13 7l5 5l-5 5" />
  </svg>
)










};


export const Icon = ({ name, ...props }: { name: keyof typeof Icons } & IconProps) => {
  const Component = Icons[name] || Icons.logo;
  return <Component {...props} />;
};

export type IconKey = keyof typeof Icons;