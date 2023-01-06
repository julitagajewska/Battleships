import React from 'react'

export default function FormInput(props) {

  const { label, errorMessage, onChange, id, type, ...inputProps } = props;

  if (type === "checkbox") {
    return (
      <div>
        <input
          type={type}
          {...inputProps}
          onChange={onChange}
        />
        <label>{label}</label>
      </div>
    )
  }

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        {...inputProps}
        onChange={onChange}
      />
    </div>
  )
}
