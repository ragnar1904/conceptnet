import { NextComponentType, NextPageContext } from 'next';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { circleSize } from 'type';

import { BaseCircle } from '../components/BaseCircle';
import { apiContext } from '../contexts/api';
import color from '../utils/color';

type Props = {
  size?: circleSize;
  style?: React.CSSProperties;
  name: string;
};

export const ResetCircle: NextComponentType<NextPageContext, {}, Props> = props => {
  const [disable, setDisable] = useState<boolean>(false);
  const apiCtx = useContext(apiContext);

  const handleClick = (): void => {
    setDisable(true);
    setTimeout(() => setDisable(false), 1000);
    apiCtx.setCurrentData(null);
  };

  return (
    <BaseCircle style={props.style} size={props.size}>
      <span>Result of... {props.name}</span>
      <ResetButton disabled={disable} onClick={handleClick}>
        Reset
      </ResetButton>
    </BaseCircle>
  );
};

const ResetButton = styled.button`
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 0.5em 1em;
  background-color: ${color.secondary.dark};
  color: ${color.white};
  border-bottom: solid 4px rgba(0, 0, 0, 0.2);
  &:disabled {
    margin-bottom: 4px;
    transform: translateY(4px);
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
    border-bottom: none;
  }
`;
