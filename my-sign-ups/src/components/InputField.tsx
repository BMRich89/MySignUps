// InputField.tsx
import React from 'react';

interface InputFieldProps {
  label: string;
  defaultValue: string;
  register: any;  // You can use a more specific type for `register` based on your form setup
}

const InputField: React.FC<InputFieldProps> = ({ label, defaultValue, register }) => {
  return (
    <div>
      <label>{label}</label>
      <input defaultValue={defaultValue} {...register(label)} />
    </div>
  );
};

export default InputField;
