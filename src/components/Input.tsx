import React from 'react';

interface Props {
  name: string;
  type: string;
  setUseState: (event: MouseEvent) => void;
  label?: string;
  value?: string;
  placeholder?: string;
}

const Input: React.FC<Props> = ({
  name,
  type,
  setUseState,
  label,
  value,
  placeholder,
}) => (
  <React.Fragment>
    {label && <label className="label">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(event) => setUseState(event)}
      autoComplete="off"
    />
  </React.Fragment>
);

export default Input;
