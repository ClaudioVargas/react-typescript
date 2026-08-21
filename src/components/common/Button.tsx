import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      style={{
        padding: '8px 12px',
        background: '#2563EB',
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
