// Custom Hook: useForm
import { useState } from 'react';

const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Implementation pending

  return {
    values,
    errors,
    touched,
    handleChange: () => {},
    handleBlur: () => {},
    handleSubmit: () => {},
    resetForm: () => {}
  };
};

export default useForm;
