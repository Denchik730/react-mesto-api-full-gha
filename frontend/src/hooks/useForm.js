import React from 'react';

export function useForm(inputValue) {
  const [values, setValues] = React.useState(inputValue);

  const handleChange = (event) => {
    const {name, value} = event.target;

    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};
}

