import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { InputBase } from '@/presentation/components'

const makeSut = (fieldName: string): void => {
  render(
    <InputBase name={fieldName} state={{}} setState={null} />
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
