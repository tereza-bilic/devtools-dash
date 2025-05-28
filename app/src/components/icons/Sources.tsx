const Sources = (props?: {className?: string, width?: string, height?: string}) => {
  const { className, width, height } = props || {};
  return (
    <svg className={className} width={width ?? "80"} height={height ?? "80"} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="34" fill="url(#paint0_linear_2133_103)" stroke="#50E867" strokeWidth="2" strokeDasharray="4 4"/>
    <path d="M26.5 44L17.5 35L26.5 26L30 29.5625L24.5625 35L30 40.4375L26.5 44ZM43.5 44L40 40.4375L45.4375 35L40 29.5625L43.5 26L52.5 35L43.5 44ZM17.5 57.5C16.125 57.5 14.9483 57.0108 13.97 56.0325C12.9917 55.0542 12.5017 53.8767 12.5 52.5V42.5H17.5V52.5H27.5V57.5H17.5ZM42.5 57.5V52.5H52.5V42.5H57.5V52.5C57.5 53.875 57.0108 55.0525 56.0325 56.0325C55.0542 57.0125 53.8767 57.5017 52.5 57.5H42.5ZM12.5 27.5V17.5C12.5 16.125 12.99 14.9483 13.97 13.97C14.95 12.9917 16.1267 12.5017 17.5 12.5H27.5V17.5H17.5V27.5H12.5ZM52.5 27.5V17.5H42.5V12.5H52.5C53.875 12.5 55.0525 12.99 56.0325 13.97C57.0125 14.95 57.5017 16.1267 57.5 17.5V27.5H52.5Z" fill="#4CAF50"/>
    <defs>
    <linearGradient id="paint0_linear_2133_103" x1="35" y1="1" x2="35" y2="69" gradientUnits="userSpaceOnUse">
    <stop offset="0.105" stopColor="#CFDEF8"/>
    <stop offset="0.565" stopColor="#EBF3FB"/>
    <stop offset="1" stopColor="#B2C8F4"/>
    </linearGradient>
    </defs>
    </svg>
  );
};

export default Sources;
