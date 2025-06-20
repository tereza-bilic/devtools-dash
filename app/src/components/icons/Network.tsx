const Network = (props?: {className?: string, width?: string, height?: string}) => {
  const { className, width, height } = props || {};
  return (
    <svg className={className} width={width ?? "80"} height={height ?? "80"} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="34" fill="url(#paint0_linear_2096_201)" stroke="#DD7696" strokeWidth="2" strokeDasharray="4 4"/>
    <g clipPath="url(#clip0_2096_201)">
    <path d="M35 61C28.3696 61 22.0107 58.3661 17.3223 53.6777C12.6339 48.9893 10 42.6304 10 36C10 29.3696 12.6339 23.0107 17.3223 18.3223C22.0107 13.6339 28.3696 11 35 11C41.6304 11 47.9893 13.6339 52.6777 18.3223C57.3661 23.0107 60 29.3696 60 36C60 42.6304 57.3661 48.9893 52.6777 53.6777C47.9893 58.3661 41.6304 61 35 61ZM54.375 41C55.2218 37.7204 55.2218 34.2796 54.375 31H44.825C45.0552 34.3294 45.0552 37.6706 44.825 41H54.375ZM52.325 46H44.275C43.8573 49.0136 43.0593 51.9621 41.9 54.775C46.2918 53.1549 49.9794 50.051 52.325 46ZM30.2 41H39.8C40.0715 37.6722 40.0715 34.3278 39.8 31H30.2C29.9285 34.3278 29.9285 37.6722 30.2 41ZM30.825 46C31.85 52 33.65 56 35 56C36.35 56 38.15 52 39.175 46H30.825ZM15.625 41H25.175C24.9448 37.6706 24.9448 34.3294 25.175 31H15.625C14.7782 34.2796 14.7782 37.7204 15.625 41ZM17.675 46C20.0206 50.051 23.7082 53.1549 28.1 54.775C27.05 52.375 26.25 49.375 25.725 46H17.675ZM52.325 26C49.9794 21.949 46.2918 18.8451 41.9 17.225C42.95 19.625 43.75 22.625 44.275 26H52.325ZM30.825 26H39.175C38.15 20 36.35 16 35 16C33.65 16 31.85 20 30.825 26ZM17.675 26H25.725C26.225 22.625 27.05 19.625 28.1 17.225C23.7082 18.8451 20.0206 21.949 17.675 26Z" fill="#BF2F5C"/>
    </g>
    <defs>
    <linearGradient id="paint0_linear_2096_201" x1="35" y1="1" x2="35" y2="69" gradientUnits="userSpaceOnUse">
    <stop offset="0.105" stopColor="#CFDEF8"/>
    <stop offset="0.565" stopColor="#EBF3FB"/>
    <stop offset="1" stopColor="#B2C8F4"/>
    </linearGradient>
    <clipPath id="clip0_2096_201">
    <rect width="50" height="50" fill="white" transform="translate(10 11)"/>
    </clipPath>
    </defs>
    </svg>
  );
};

export default Network;
