import { createContext, useCallback, useState } from 'react';

// set context type
export type FormContext = {
  value: string;
  setCurrentValue: (current: string) => void;
};

// context default value
const DEFAULT_VALUE_CONTEXT: FormContext = {
  value: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentValue: () => {},
};

// context
export const formContext = createContext<FormContext>(DEFAULT_VALUE_CONTEXT);

// custom Hook
export const useForm = (): FormContext => {
  const [value, setValue] = useState("");
  const setCurrentValue = useCallback((current: string): void => {
    setValue(current);
  }, []);

  return {
    value,
    setCurrentValue,
  };
};
