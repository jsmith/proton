export const BLACK = 'black'

export const WHITE = 'white'

export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(note => {
  return {
    value: note,
    color: note.endsWith('#') ? BLACK : WHITE
  }
})
