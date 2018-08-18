export const BLACK = 'black'

export const WHITE = 'white'

export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(note => {
  return {
    value: note,
    color: note.endsWith('#') ? BLACK : WHITE
  }
})

export const range = (a, b = 0, interval = 1) => {
  let start
  let end
  if (a > b) {
    start = 0; end = a
  } else {
    start = a; end = b
  }
  const range = []
  for (let i = start; i <= end; i += interval) {
    range.push(i)
  }
  return range
}

export const TREE = {
  'root': {
    'folder 1': {
      'item 1': {},
      'folder 2': {
        'item 2': {}
      }
    },
    'item 3': {}
  }
}
