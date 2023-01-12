import React from 'react'

export default function FormInput(props) {

  const {
    label,
    errorMessage,
    onChange,
    id,
    ref,
    required,
    type,
    onFocus,
    onBlur,
    autocomplete,
    ...inputProps } = props;

  if (required === true) {
    if (type === "checkbox") {
      return (
        <div>
          <input
            type={type}
            id={id}
            ref={ref}
            {...inputProps}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required
          />
          <label>{label}</label>
        </div>
      )
    }

    return (
      <div>
        <input
          type={type}
          id={id}
          ref={ref}
          {...inputProps}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          autocomplete={autocomplete}
          required
        />
        <label>{label}</label>
      </div>
    )
  }

  if (type === "checkbox") {
    return (
      <div>
        <input
          type={type}
          id={id}
          ref={ref}
          {...inputProps}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
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
