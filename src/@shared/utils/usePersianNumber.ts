/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

export function usePersianNumber() {
  const persianNumberPattern = '\u06F0-\u06F9'

  const persianNumbersTable = [
    '\u06F0',
    '\u06F1',
    '\u06F2',
    '\u06F3',
    '\u06F4',
    '\u06F5',
    '\u06F6',
    '\u06F7',
    '\u06F8',
    '\u06F9'
  ]

  const englishNumbersTable = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  /**
   * Splits input value by persian letters and then returns length of matched array.
   *
   * @param value
   * @return 0 if input value has no persian letter, numbers of persian letters in the input value otherwise.
   */
  function _getMatchedPatternLength(value: string): number {
    // Language=JSRegexp
    const matchResult = value.match(new RegExp(`[${persianNumberPattern}]`, 'g'))
    return matchResult ? matchResult.length : 0
  }

  /**
   * Checks if input value contains any persian number or not.
   *
   * @param value
   * @return true if input value contains any persian number. false otherwise.
   */
  function containsPersian(value: string): boolean {
    if (!value) {
      return false
    }
    // Language=JSRegexp
    const persianRegex = new RegExp(`[${persianNumberPattern}]`)
    return persianRegex.test(value)
  }

  /**
   * Checks if input value contains only persian letters.
   *
   * @param value
   */
  function isPersian(value: string): boolean {
    if (!value) {
      return false
    }
    return value.length === _getMatchedPatternLength(value)
  }

  /**
   * Converts arabic numbers to the persian ones.
   *
   * @param value
   */
  function arabicToPersian(value: string): string {
    return value
      .replace(/٤/g, persianNumbersTable[4])
      .replace(/٥/g, persianNumbersTable[5])
      .replace(/٦/g, persianNumbersTable[6])
  }

  /**
   * Converts all arabic and english numbers to the persian numbers.
   *
   * @param value
   */
  function toPersian(value: string | number): string {
    if (value === undefined || value === null) return ''

    let persianValue: string = value.toString()

    persianValue = this.arabicToPersian(persianValue)

    let regex: RegExp

    for (let i = 0; i < persianNumbersTable.length; i++) {
      // Language=JSRegexp
      regex = new RegExp(`[${englishNumbersTable[i]}]`, 'g')
      persianValue = persianValue.replace(regex, persianNumbersTable[i])
    }

    return persianValue
  }

  /**
   * Convert persian numbers in input value to the english numbers.
   *
   * @param value
   */
  function toEnglish(value: string): string {
    if (value === undefined || value === null) return ''

    let englishValue: string = value

    let regex: RegExp

    for (let i = 0; i < englishNumbersTable.length; i++) {
      // Language=JSRegexp
      regex = new RegExp(`[${persianNumbersTable[i]}]`, 'g')

      englishValue = englishValue.replace(regex, englishNumbersTable[i])
    }

    return englishValue
  }

  return {
    containsPersian,
    isPersian,
    arabicToPersian,
    toPersian,
    toEnglish
  }
}
