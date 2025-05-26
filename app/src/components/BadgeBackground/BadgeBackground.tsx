const BadgeBackground = ({color, width, height}: {color: 'gold' | 'silver' | 'bronze', width?: string, height?: string}) => {
  if (color === 'gold') {
    return (
    <svg width={width ?? '120'} height={height ?? '132'} viewBox="0 0 120 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52.25 3.74219C57.0457 0.973456 62.9543 0.973455 67.75 3.74219L110.042 28.1592C114.838 30.928 117.792 36.0454 117.792 41.583V90.417C117.792 95.9546 114.838 101.072 110.042 103.841L67.75 128.258C62.9543 131.027 57.0457 131.027 52.25 128.258L9.95801 103.841C5.16236 101.072 2.20801 95.9546 2.20801 90.417V41.583C2.20801 36.0454 5.16236 30.928 9.95801 28.1592L52.25 3.74219Z" fill="url(#paint0_linear_2129_93)" stroke="url(#paint1_linear_2129_93)" stroke-width="3"/>
      <defs>
      <linearGradient id="paint0_linear_2129_93" x1="41.832" y1="3.59067" x2="78.168" y2="128.409" gradientUnits="userSpaceOnUse">
      <stop offset="0.178457" stop-color="#FBCC31"/>
      <stop offset="0.406403" stop-color="#FFEDB3"/>
      <stop offset="0.755026" stop-color="#EFBF20"/>
      </linearGradient>
      <linearGradient id="paint1_linear_2129_93" x1="60" y1="1" x2="60" y2="131" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFCD29"/>
      <stop offset="0.46" stop-color="#FFE385"/>
      <stop offset="1" stop-color="#FFCD29"/>
      </linearGradient>
      </defs>
    </svg>
    );
  }

  if (color === 'silver') {
    return (
      <svg width={width ?? '120'} height={height ?? '132'} viewBox="0 0 120 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52.25 3.74219C57.0457 0.973456 62.9543 0.973455 67.75 3.74219L110.042 28.1592C114.838 30.928 117.792 36.0454 117.792 41.583V90.417C117.792 95.9546 114.838 101.072 110.042 103.841L67.75 128.258C62.9543 131.027 57.0457 131.027 52.25 128.258L9.95801 103.841C5.16236 101.072 2.20801 95.9546 2.20801 90.417V41.583C2.20801 36.0454 5.16236 30.928 9.95801 28.1592L52.25 3.74219Z" fill="url(#paint0_linear_2131_97)" stroke="url(#paint1_linear_2131_97)" stroke-width="3"/>
      <defs>
      <linearGradient id="paint0_linear_2131_97" x1="41.832" y1="3.59067" x2="78.168" y2="128.409" gradientUnits="userSpaceOnUse">
      <stop offset="0.178457" stop-color="#B4B4B4"/>
      <stop offset="0.406403" stop-color="#F3F3F3"/>
      <stop offset="0.755026" stop-color="#B4B4B4"/>
      </linearGradient>
      <linearGradient id="paint1_linear_2131_97" x1="60" y1="1" x2="60" y2="131" gradientUnits="userSpaceOnUse">
      <stop stop-color="#B4B4B4"/>
      <stop offset="0.295" stop-color="#DFDFDF"/>
      <stop offset="1" stop-color="#B4B4B4"/>
      </linearGradient>
      </defs>
      </svg>
    );
  }

  if (color === 'bronze') {
    return (
      <svg width={width ?? '120'} height={height ?? '132'} viewBox="0 0 120 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52.25 3.74219C57.0457 0.973456 62.9543 0.973455 67.75 3.74219L110.042 28.1592C114.838 30.928 117.792 36.0454 117.792 41.583V90.417C117.792 95.9546 114.838 101.072 110.042 103.841L67.75 128.258C62.9543 131.027 57.0457 131.027 52.25 128.258L9.95801 103.841C5.16236 101.072 2.20801 95.9546 2.20801 90.417V41.583C2.20801 36.0454 5.16236 30.928 9.95801 28.1592L52.25 3.74219Z" fill="url(#paint0_linear_2131_99)" stroke="url(#paint1_linear_2131_99)" stroke-width="3"/>
      <defs>
      <linearGradient id="paint0_linear_2131_99" x1="41.832" y1="3.59067" x2="78.168" y2="128.409" gradientUnits="userSpaceOnUse">
      <stop offset="0.178457" stop-color="#A35936"/>
      <stop offset="0.406403" stop-color="#FE8D59"/>
      <stop offset="0.755026" stop-color="#A35936"/>
      </linearGradient>
      <linearGradient id="paint1_linear_2131_99" x1="60" y1="1" x2="60" y2="131" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FE8D59"/>
      <stop offset="0.295" stop-color="#FF9E7C"/>
      <stop offset="1" stop-color="#FE8D59"/>
      </linearGradient>
      </defs>
      </svg>
    );
  }
}

export default BadgeBackground;
