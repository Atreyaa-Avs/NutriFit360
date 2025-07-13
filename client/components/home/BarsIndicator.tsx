import React from "react";
import Svg, { Rect } from "react-native-svg";

interface BarsIndicatorProps {
  values: number[];
  width?: number;
  height?: number;
  barColor?: string;
  barWidth?: number;
  spacing?: number;
  alignBottom?: boolean;
  cornerRadius?: number;
}

const BarsIndicator = ({
  values,
  width = 100,
  height = 100,
  barColor = "#12c2e9",
  barWidth = 4,
  spacing = 2,
  alignBottom = true,
  cornerRadius = 4,
}: BarsIndicatorProps) => {
  const maxValue = Math.max(...values, 1);

  return (
    <Svg width={width} height={height}>
      {values.map((value, index) => {
        const scaledHeight = (value / maxValue) * height;
        const x = index * (barWidth + spacing);
        const y = alignBottom ? height - scaledHeight : 0;

        return (
          <Rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={scaledHeight}
            fill={barColor}
            rx={cornerRadius}
            ry={cornerRadius}
          />
        );
      })}
    </Svg>
  );
};

export default BarsIndicator;