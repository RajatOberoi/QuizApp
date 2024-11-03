import React from 'react';

const CircularProgress = ({ 
    progress = 1, 
    max = 5, 
    size = 100, 
    strokeWidth = 10, 
    color = '#44B77B', 
    trackColor = '#e6e6e6' 
}) => {
   
    const outerRadius = size / 2 - strokeWidth / 2; // Radius for the outer white circle
    const innerRadius = outerRadius - strokeWidth - 2; // Radius for inner circles, slightly smaller
    // const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * innerRadius;

  
    const offset = circumference - (progress / max) * circumference;

    return (
        <svg width={size} height={size}>

            <circle
                cx={size / 2}
                cy={size / 2}
                r={outerRadius}
                fill="white"
                stroke={"white"}
                strokeWidth={strokeWidth}
            />
         
            <circle
                cx={size / 2}
                cy={size / 2}
                r={innerRadius}
                fill="none"
                stroke={trackColor}
                strokeWidth={strokeWidth}
            />
          
            <circle
                cx={size / 2}
                cy={size / 2}
                r={innerRadius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        
            <text
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle"
                fontSize="1.5em"
                fill="#333"
            >
                {`${progress}/${max}`}
            </text>
        </svg>
    );
};

export default CircularProgress;
