import { useState } from 'react'
import './ClaimForm.css'

const INITIAL_VALUES = {
  name: '',
  email: '',
  type: '',
  description: '',
  amount: '',
}

function validate(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Full name is required'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!values.type) {
    errors.type = 'Please select a claim type'
  }

  if (!values.description.trim()) {
    errors.description = 'Description is required'
  } else if (values.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters'
  }

  if (!values.amount.toString().trim()) {
    errors.amount = 'Claim amount is required'
  } else if (isNaN(Number(values.amount))) {
    errors.amount = 'Amount must be a valid number'
  } else if (Number(values.amount) <= 0) {
    errors.amount = 'Amount must be greater than $0'
  }

  return errors
}

export default function ClaimForm({ onSubmit, loading }) {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const fieldErrors = validate({ ...values, [name]: value })
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const fieldErrors = validate(values)
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const allTouched = Object.keys(INITIAL_VALUES).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {},
    )
    setTouched(allTouched)
    const formErrors = validate(values)
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return
    onSubmit(values)
  }

  const fieldError = (name) => touched[name] && errors[name]

  return (
    <form
      className="claim-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="New claim submission form"
    >
      <div className="claim-form__row">
        <div className={`claim-form__group${fieldError('name') ? ' claim-form__group--error' : ''}`}>
          <label className="claim-form__label" htmlFor="name">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="claim-form__input"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Jane Smith"
            autoComplete="name"
            aria-required="true"
            aria-describedby={fieldError('name') ? 'name-error' : undefined}
          />
          {fieldError('name') && (
            <p className="claim-form__error" id="name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className={`claim-form__group${fieldError('email') ? ' claim-form__group--error' : ''}`}>
          <label className="claim-form__label" htmlFor="email">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="claim-form__input"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. jane@example.com"
            autoComplete="email"
            aria-required="true"
            aria-describedby={fieldError('email') ? 'email-error' : undefined}
          />
          {fieldError('email') && (
            <p className="claim-form__error" id="email-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="claim-form__row">
        <div className={`claim-form__group${fieldError('type') ? ' claim-form__group--error' : ''}`}>
          <label className="claim-form__label" htmlFor="type">
            Claim Type <span aria-hidden="true">*</span>
          </label>
          <select
            id="type"
            name="type"
            className="claim-form__select"
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-describedby={fieldError('type') ? 'type-error' : undefined}
          >
            <option value="" disabled>Select claim type…</option>
            <option value="Auto">Auto</option>
            <option value="Home">Home</option>
            <option value="Health">Health</option>
            <option value="Life">Life</option>
          </select>
          {fieldError('type') && (
            <p className="claim-form__error" id="type-error" role="alert">
              {errors.type}
            </p>
          )}
        </div>

        <div className={`claim-form__group${fieldError('amount') ? ' claim-form__group--error' : ''}`}>
          <label className="claim-form__label" htmlFor="amount">
            Claim Amount (USD) <span aria-hidden="true">*</span>
          </label>
          <div className="claim-form__input-prefix-wrapper">
            <span className="claim-form__input-prefix" aria-hidden="true">$</span>
            <input
              id="amount"
              name="amount"
              type="number"
              className="claim-form__input claim-form__input--prefixed"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              aria-required="true"
              aria-describedby={fieldError('amount') ? 'amount-error' : undefined}
            />
          </div>
          {fieldError('amount') && (
            <p className="claim-form__error" id="amount-error" role="alert">
              {errors.amount}
            </p>
          )}
        </div>
      </div>

      <div className={`claim-form__group${fieldError('description') ? ' claim-form__group--error' : ''}`}>
        <label className="claim-form__label" htmlFor="description">
          Claim Description <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          className="claim-form__textarea"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Provide a detailed description of the incident or claim…"
          rows={5}
          aria-required="true"
          aria-describedby={fieldError('description') ? 'description-error' : undefined}
        />
        <div className="claim-form__char-count">
          {values.description.length} characters
          {values.description.length > 0 && values.description.length < 10 && (
            <span> (minimum 10)</span>
          )}
        </div>
        {fieldError('description') && (
          <p className="claim-form__error" id="description-error" role="alert">
            {errors.description}
          </p>
        )}
      </div>

      <div className="claim-form__actions">
        <button
          type="submit"
          className="claim-form__submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="claim-form__spinner" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            'Submit Claim'
          )}
        </button>
        <p className="claim-form__required-note">
          <span aria-hidden="true">*</span> Required fields
        </p>
      </div>
    </form>
  )
}
