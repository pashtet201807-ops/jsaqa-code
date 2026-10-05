const { sortByName } = require('../../app');

describe('Books sorting tests', () => {
  test('Sorts book names in ascending order', () => {
    const input = [
      'Гарри Поттер',
      'Властелин Колец',
      'Война и мир',
    ];
    const expected = [
      'Властелин Колец',
      'Война и мир',
      'Гарри Поттер',
    ];
    expect(sortByName(input)).toEqual(expected);
  });

  test('Handles equal book names correctly (returns 0 branch)', () => {
    const input = [
      'Гарри Поттер',
      'Гарри Поттер',
    ];
    const expected = [
      'Гарри Поттер',
      'Гарри Поттер',
    ];
    expect(sortByName(input)).toEqual(expected);
  });
});