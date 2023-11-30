import React from 'react'
import { type RenderResult, fireEvent, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import Context from '@/presentation/contexts/form/form-context'
import { Input } from '@/presentation/components'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('Should focus input on label click', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field)
    const label = sut.getByTestId(`${field}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toEqual(input)
  })
})
