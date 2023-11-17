import { useState } from "react";

const useForm = (intial = {}) => {
  const [inputs, setInputs] = useState(intial);

  const handleChange = (e) => {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const reset = () => {
    setInputs(intial);
  };

  const clear = () => {
    const emptyInput = Object.keys(inputs).map((item) => [item, ""]);
    setInputs(emptyInput);
  };

  return { inputs, handleChange, reset, clear };
};

export default useForm;
