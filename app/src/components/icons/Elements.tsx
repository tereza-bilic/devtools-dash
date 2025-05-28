const Elements = (props?: {className?: string, width?: string, height?: string}) => {
  const { className, width, height } = props || {};
  return (
    <svg className={className} width={width ?? "80"} height={height ?? "80"} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="34" fill="url(#paint0_linear_2093_199)" stroke="#6C9DF8" strokeWidth="2" strokeDasharray="4 4"/>
      <path d="M31.8 38.2V29.4H36.2V33.8H40.6V38.2H31.8ZM47.2 38.2V33.8H51.6V29.4H56V38.2H47.2ZM31.8 22.8V14H40.6V18.4H36.2V22.8H31.8ZM51.6 22.8V18.4H47.2V14H56V22.8H51.6ZM15.08 58L12 54.92L24.32 42.6H14.2V38.2H31.8V55.8H27.4V45.68L15.08 58Z" fill="#5B86D7"/>
      <defs>
      <linearGradient id="paint0_linear_2093_199" x1="19.5" y1="-7.5" x2="35" y2="69" gradientUnits="userSpaceOnUse">
      <stop stopColor="#CFDEF8"/>
      <stop offset="0.565" stopColor="#EBF3FB"/>
      <stop offset="1" stopColor="#B2C8F4"/>
      </linearGradient>
      </defs>
    </svg>
  );
};


export default Elements;
