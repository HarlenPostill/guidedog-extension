import React from 'react';
import './PawGraph.css';

interface PawGraphProps {
  aViolations: number;
  aaViolations: number;
  aaaViolations: number;
}

const PawGraph: React.FC<PawGraphProps> = ({ aViolations, aaViolations, aaaViolations }) => {
  // Calculate the offset to fill from the bottom
  const aaaWaterlvl = aaaViolations / (aViolations + aaViolations + aaaViolations);
  const aaWaterlvl = (aaViolations + aaaViolations) / (aViolations + aaViolations + aaaViolations);

  const height = 100;
  const width = height;
  const aaOffsetY = height - height * aaWaterlvl;
  const aaaOffsetY = height - height * aaaWaterlvl;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 264 264">
      {/* Define the droplet or paw shape */}
      <clipPath id="mask_shape">
        <path d="M132.281 264.564c51.24 0 92.931-41.681 92.931-92.918 0-50.18-87.094-164.069-90.803-168.891L132.281 0l-2.128 2.773c-3.704 4.813-90.802 118.71-90.802 168.882.001 51.228 41.691 92.909 92.93 92.909z" />
      </clipPath>

      {/* Paw shape */}
      <path
        d="M132.281 264.564c51.24 0 92.931-41.681 92.931-92.918 0-50.18-87.094-164.069-90.803-168.891L132.281 0l-2.128 2.773c-3.704 4.813-90.802 118.71-90.802 168.882.001 51.228 41.691 92.909 92.93 92.909z"
        fill="#343434"
      />

      {/* Water fill */}
      <g clipPath="url(#mask_shape)">
        {/* Water bar */}
        <rect
          width={width}
          height={height}
          style={{ transform: `translateY(${aaOffsetY}px)` }}
          fill="#FF6D6D"
        />

        {/* Ripple effect */}
        <g
          className="water-container"
          style={{
            transform: `translateY(${aaWaterlvl === 0 ? aaOffsetY : aaOffsetY - 19}px)`,
          }}>
          <path
            className="aaWater"
            d="M420 20.0047C441.5 19.6047 458.8 17.5047 471.1 15.5047C484.5 13.3047 497.6 10.3047 498.4 10.1047C514 6.50474 518 4.70474 528.5 2.70474C535.6 1.40474 546.4 -0.0952561 560 0.00474393V20.0047H420ZM420 20.0047C398.5 19.6047 381.2 17.5047 368.9 15.5047C355.5 13.3047 342.4 10.3047 341.6 10.1047C326 6.50474 322 4.70474 311.5 2.70474C304.3 1.40474 293.6 -0.0952561 280 0.00474393V20.0047H420ZM140 20.0047C118.5 19.6047 101.2 17.5047 88.9 15.5047C75.5 13.3047 62.4 10.3047 61.6 10.1047C46 6.50474 42 4.70474 31.5 2.70474C24.3 1.40474 13.6 -0.0952561 0 0.00474393V20.0047H140ZM140 20.0047C161.5 19.6047 178.8 17.5047 191.1 15.5047C204.5 13.3047 217.6 10.3047 218.4 10.1047C234 6.50474 238 4.70474 248.5 2.70474C255.6 1.40474 266.4 -0.0952561 280 0.00474393V20.0047H140Z"
          />
        </g>
      </g>

      {/* 2nd Water fill */}
      <g clipPath="url(#mask_shape)">
        {/* Water bar */}
        <rect
          width={width}
          height={height}
          style={{ transform: `translateY(${aaaOffsetY}px)` }}
          fill="#FDA1A2"
        />

        {/* Ripple effect */}
        <g
          className="water-container"
          style={{
            transform: `translateY(${aaaWaterlvl === 0 ? aaaOffsetY : aaaOffsetY - 19}px)`,
          }}>
          <path
            className="aaaWater"
            d="M420 20.0047C441.5 19.6047 458.8 17.5047 471.1 15.5047C484.5 13.3047 497.6 10.3047 498.4 10.1047C514 6.50474 518 4.70474 528.5 2.70474C535.6 1.40474 546.4 -0.0952561 560 0.00474393V20.0047H420ZM420 20.0047C398.5 19.6047 381.2 17.5047 368.9 15.5047C355.5 13.3047 342.4 10.3047 341.6 10.1047C326 6.50474 322 4.70474 311.5 2.70474C304.3 1.40474 293.6 -0.0952561 280 0.00474393V20.0047H420ZM140 20.0047C118.5 19.6047 101.2 17.5047 88.9 15.5047C75.5 13.3047 62.4 10.3047 61.6 10.1047C46 6.50474 42 4.70474 31.5 2.70474C24.3 1.40474 13.6 -0.0952561 0 0.00474393V20.0047H140ZM140 20.0047C161.5 19.6047 178.8 17.5047 191.1 15.5047C204.5 13.3047 217.6 10.3047 218.4 10.1047C234 6.50474 238 4.70474 248.5 2.70474C255.6 1.40474 266.4 -0.0952561 280 0.00474393V20.0047H140Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default PawGraph;
