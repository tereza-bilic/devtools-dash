const Performance = (props?: {className?: string, width?: string, height?: string}) => {
  const { className, width, height } = props || {};
  return (
    <svg className={className} width={width ?? "80"} height={height ?? "80"} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="34" fill="url(#paint0_linear_2138_118)" stroke="#B074FF" strokeWidth="2" strokeDasharray="4 4"/>
      <path d="M41.5594 30.5615C41.5594 30.5615 38.1948 40.0428 36.5969 41.698C35.8255 42.4758 34.7787 42.9186 33.6833 42.9304C32.5879 42.9422 31.5318 42.5222 30.7438 41.7611C29.9558 41.0001 29.4992 39.9593 29.4729 38.8642C29.4466 37.769 29.8526 36.7075 30.6031 35.9094C32.201 34.2532 41.5594 30.5615 41.5594 30.5615Z" fill="#9444FC" stroke="#9444FC" strokeWidth="5" strokeLinejoin="round"/>
      <path d="M50.4687 51.4688C52.5027 49.4394 54.1158 47.0281 55.2152 44.3735C56.3145 41.7189 56.8786 38.8733 56.875 36C56.875 23.9188 47.0812 14.125 35 14.125C22.9188 14.125 13.125 23.9188 13.125 36C13.125 42.0406 15.5729 47.5094 19.5312 51.4688M35 15.1667V19.3333M50.4635 22.6063L47.226 25.2281M54.2937 39.3677L50.2344 38.4302M15.7052 39.3677L19.7656 38.4302M19.5365 22.6063L22.774 25.2281" stroke="#9444FC" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
      <linearGradient id="paint0_linear_2138_118" x1="35" y1="1" x2="35" y2="69" gradientUnits="userSpaceOnUse">
      <stop offset="0.105" stopColor="#CFDEF8"/>
      <stop offset="0.565" stopColor="#EBF3FB"/>
      <stop offset="1" stopColor="#B2C8F4"/>
      </linearGradient>
      </defs>
    </svg>
  );
};


export default Performance;
