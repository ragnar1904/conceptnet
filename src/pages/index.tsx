import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { LabelCircle } from '../components/LabelCircle';
import { FormCircle } from '../containers/FormCircle';
import { ResetCircle } from '../containers/ResetCircle';
import { apiContext, useAPI } from '../contexts/api';
import { formContext, useForm } from '../contexts/form';
import color from '../utils/color';

const Index: NextPage = () => {
  const formCtx = useForm();
  const apiCtx = useAPI();

  const edgeData = (() => {
    if (apiCtx.data !== null) {
      const circleSize = "md";
      const circleStyle: React.CSSProperties = { margin: "2rem" };
      return apiCtx.data.edges.map((item, key) => {
        return <LabelCircle style={circleStyle} size={circleSize} name={item.start.label} key={key} />;
      });
    } else {
      return null;
    }
  })();

  const ResetCircleStyle: React.CSSProperties = {
    backgroundColor: color.secondary.dark,
    color: color.white,
  };

  return (
    <formContext.Provider value={formCtx}>
      <apiContext.Provider value={apiCtx}>
        <Root className={edgeData ? "align" : ""}>
          {edgeData ? (
            <React.Fragment>
              <ResetCircle style={ResetCircleStyle} size="lg" name={formCtx.value} />
              {edgeData}
            </React.Fragment>
          ) : (
            <FormCircle />
          )}
        </Root>
      </apiContext.Provider>
    </formContext.Provider>
  );
};

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    margin: 0 auto;
    flex-shrink: 0;
  }
  &.align {
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
  }
`;

export default Index;
