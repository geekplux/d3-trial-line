import Line from '../index'

const gen = n => {
  const data = []

  for (let i = 0; i < n; ++i) {
    data.push({
      value: Math.max(10, Math.floor(Math.random() * 100))
    })
  }

  return data
}

const line = new Line({
  target: '.container',
  enableAxis: true
})

line.render(gen(20))
