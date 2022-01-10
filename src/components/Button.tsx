import React from 'react';

interface ButtonProps {
  onClickFunction?: (event: MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClickFunction }) => {
  return <button onClick={onClickFunction}>{children}</button>;
};

export default Button;
