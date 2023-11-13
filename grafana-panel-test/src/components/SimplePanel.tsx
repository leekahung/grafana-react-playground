import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  // const theme = useTheme2();
  const styles = useStyles2(getStyles);
  // let color = theme.visualization.getColorByName(options.color);
  const radii = data.series
    .map((series) => series.fields.find((field) => field.type === 'number'))
    .map((field) => field?.values.get(field.values.length - 1));
  const valueToDisplay: number = radii[0];
  const circleRadius = Math.min(width, height) / 4;

  // Use fillLevel as percentage fill for circle
  const fillLevel = valueToDisplay / 100;

  // fillHeight of circle from the rect's perspective, i.e. from top border down
  // should be (2 * radius * fillLevel) or (diameter * fillLevel)
  const diameter = 2 * circleRadius;
  const fillHeight = diameter * fillLevel;

  // fillHeight of the circle from the circle's perspective, i.e. bottom border up
  // should be (2 * radius - fillHeight) or (diameter - fillHeight)
  const fillHeightCircle = diameter - fillHeight;
  const percentageCircleHeight = fillHeightCircle / diameter;
  // console.log(percentageCircleHeight);

  // Values based off of circle centered within rectangular area with fixed width and height
  const medianHeight = height / 2;
  const baselineCircleFromTopBorder = medianHeight - circleRadius;

  const renderCircleHeight = () => {
    if (percentageCircleHeight > 1) {
      return baselineCircleFromTopBorder + diameter;
    } else if (percentageCircleHeight < 0) {
      return baselineCircleFromTopBorder;
    } else {
      return baselineCircleFromTopBorder + fillHeightCircle;
    }
  };

  const renderGaugeLevels = () => {
    if (valueToDisplay <= 0) {
      return 'Warning: Min-limit reached!';
    } else if (valueToDisplay <= 20) {
      return 'Warning: Reaching lower limit!';
    } else if (valueToDisplay <= 40 || (valueToDisplay >= 60 && valueToDisplay < 80)) {
      return 'Warning: Deviating from optimal threshold!';
    } else if (valueToDisplay < 100) {
      return 'Warning: Reaching upper limit!';
    } else if (valueToDisplay >= 100) {
      return 'Warning: Max-limit Reached!';
    } else {
      return 'Operating in optimal range.';
    }
  };

  const renderGaugeStyling = () => {
    if (valueToDisplay <= 0) {
      return 'red';
    } else if (valueToDisplay <= 20) {
      return 'orange';
    } else if (valueToDisplay <= 40 || (valueToDisplay >= 60 && valueToDisplay < 80)) {
      return 'yellow';
    } else if (valueToDisplay < 100) {
      return 'orange';
    } else if (valueToDisplay >= 100) {
      return 'red';
    } else {
      return 'green';
    }
  };

  return (
    <div className={cx(styles.wrapper)}>
      <svg className={styles.svg} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <clipPath id={`clip-${options.panelId}`}>
            <rect x="0" y={renderCircleHeight()} width={width} height={diameter} />
          </clipPath>
        </defs>
        <circle
          cx={width / 2}
          cy={height / 2}
          r={circleRadius}
          fill={renderGaugeStyling()}
          clipPath={`url(#clip-${options.panelId})`}
        />
        <text
          x={width / 2}
          y={height / 2 - circleRadius - 60}
          textAnchor="middle"
          fill={renderGaugeStyling()}
          fontSize="16"
          fontFamily="Open Sans"
        >
          {renderGaugeLevels()}
        </text>
        <text
          x={width / 2}
          y={height / 2 - circleRadius - 20}
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontFamily="Open Sans"
        >
          {`Value: ${valueToDisplay?.toFixed(2)}`}
        </text>
      </svg>
      <div className={styles.textBox}>
        {options.showSeriesCount && <div>Number of series: {data.series.length}</div>}
        <div>Text option value: {options.text}</div>
      </div>
    </div>
  );
};
