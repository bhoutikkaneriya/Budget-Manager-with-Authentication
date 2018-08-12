const greeting = (name = 'Ano') => {
    return `Hi ${name}`
}

test ('Testing greeting with parameters', () => {
    const result = greeting('bhoutik')
    expect(result).toBe('Hi bhoutik')
})

test ('Testing greeting without parameters', () => {
    const result = greeting()
    expect(result).toBe('Hi Ano')
})