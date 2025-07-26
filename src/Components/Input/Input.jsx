import React from 'react';

const Input = (props) => {
  const { setInput, placeholder } = props;

  return (
    <div>
      <input
        type="text"
        id="custom-input"
        onChange={(event) => setInput(event.target.value)}
        placeholder={placeholder}
      />
      <label htmlFor="custom-input">{placeholder}</label>
    </div>
  );
};

export default Input;
