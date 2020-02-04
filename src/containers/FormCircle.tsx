import { ConceptNetAPI } from 'api';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BaseCircle } from '../components/BaseCircle';
import { apiContext } from '../contexts/api';
import { formContext } from '../contexts/form';
// import { getApiData } from '../utils/api';
import color from '../utils/color';

export const FormCircle: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const formCtx = useContext(formContext);
  const apiCtx = useContext(apiContext);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    formCtx.setCurrentValue(e.target.value);
  };

  // アンマウント時にfetchをキャンセルできるようにしておく
  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!isFirstRender) {
      const url = `http://api.conceptnet.io/c/ja/${value}`;
      const getData = async (): Promise<ConceptNetAPI | null> =>
        await axios
          .get(url, {
            cancelToken: source.token,
          })
          .then(res => {
            return res.data as ConceptNetAPI;
          })
          .catch(err => {
            console.log(err);
            return null;
          });
      getData().then(res => apiCtx.setCurrentData(res));
      return () => {
        source.cancel();
      };
    } else {
      setIsFirstRender(false);
    }
  }, [disable]);

  // clear timer
  useEffect(() => {
    if (disable === true) {
      const timer = setTimeout(() => setDisable(false), 1000);
      return (): void => clearTimeout(timer);
    }
  }, [disable]);

  return (
    <BaseCircle size="lg">
      <Input onChange={handleInput} />
      <Button disabled={disable} onClick={(): void => setDisable(true)}>
        Submit!
      </Button>
    </BaseCircle>
  );
};

const Input = styled.input`
  font-size: 1.7rem;
  background: transparent;
  border-bottom: 3px solid ${color.secondary.dark};
  color: black;
  width: 80%;
  padding: 0.5em;
  margin: 1em;
  & :focus {
    outline: none;
  }
`;

const Button = styled.button`
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
