import { useState } from 'react';
export default (initValue = false) => {
  const [value, setValue] = useState(initValue);
  const toggle = () => {
    setValue(!value);
  };
  return [value, toggle];
};
