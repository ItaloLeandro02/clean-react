import React from 'react'
import { render, screen } from '@testing-library/react'
import { Login } from '@/presentation/pages'

describe('Login Component', () => {
  test('Should start with initial state', () => {
    render(<Login />)
    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()
  })
})
