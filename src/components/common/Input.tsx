import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<Props> = ({ label, ...rest }) => {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      {label && <div style={{ marginBottom: 4 }}>{label}</div>}
      <input {...rest} style={{ padding: 8, width: '100%', boxSizing: 'border-box' }} />
    </label>
  );
};

export default Input;
