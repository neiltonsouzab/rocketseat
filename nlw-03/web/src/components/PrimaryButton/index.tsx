import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

const PrimaryButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  return (
    <button className="primary-button" {...rest}>
      {children}
    </button>
  );
}

export default PrimaryButton;