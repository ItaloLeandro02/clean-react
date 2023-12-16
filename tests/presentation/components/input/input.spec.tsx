import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import Context from '@/presentation/contexts/form/form-context'
import { Input } from '@/presentation/components'

const makeSut = (fieldName: string): void => {
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('Should focus input on label click', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field)
    const label = screen.getByTestId(`${field}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toEqual(input)
  })
})
