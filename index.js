import { select as d3select,
         scaleLinear as d3scaleLinear,
         line as d3line,
         extent as d3extent,
         axisLeft as d3axisLeft,
         axisRight as d3axisRight,
         axisBottom as d3axisBottom,
         axisTop as d3axisTop } from 'd3'

/**
 * Default config.
 */

const defaults = {
  // target element or selector to contain the svg
  target: null,

  // class of the svg
  className: 'line',

  // width of chart
  width: 500,

  // height of chart
  height: 200,

  // margin
  margin: { top: 20, right: 20, bottom: 40, left: 40 },

  // enable axis
  enableAxis: false,

  // axis orient
  axisOrient: { x: 'bottom', y: 'left' },

  // axis padding
  axisPadding: 5,

  // line stroke
  stroke: 'steelblue',

  // line fill
  fill: 'none'
}

/**
 * d3 axis methods map.
 */

const axisMap = {
  left: d3axisLeft,
  right: d3axisRight,
  top: d3axisTop,
  bottom: d3axisBottom
}

/**
 * LineChart.
 */

export default class Line {

  /**
   * Construct with the given `config`.
   */

  constructor (options) {
    this.set(options)
    this.init()
  }

  /**
   * Set configuration options.
   */

  set (options) {
    Object.assign(this, defaults, options)
  }

  /**
   * Dimensions without margin.
   */

  dimensions () {
    const { width, height, margin } = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom
    return [w, h]
  }

  /**
   * Initialize the chart.
   */

  init (options) {
    const { target, className, width, height, margin,
            enableAxis, axisOrient } = this
    const [w, h] = this.dimensions()

    this.chart = d3select(target)
      .append('svg')
      .attr('class', className)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.xScale = d3scaleLinear()
      .range([0, w])
    this.yScale = d3scaleLinear()
      .range([h, 0])

    this.line = d3line()
      .x(d => this.xScale(d.bin))
      .y(d => this.yScale(d.value))

    if (enableAxis) {
      this.xAxis = axisMap[axisOrient.x](this.xScale)
      this.yAxis = axisMap[axisOrient.y](this.yScale)
    }
  }

  /**
   * Render axis.
   */

  renderAxis (data) {
    if (!this.enableAxis) return
  }

  /**
   * Render line.
   */

  renderLine (data) {
    const { xScale, yScale, stroke, fill } = this

    xScale.domain(d3extent(data, d => d.bin))
    yScale.domain(d3extent(data, d => d.value))

    this.chart
      .append('path')
      .attr('class', 'line')
      .attr('d', this.line(data))
      .style('stroke', stroke)
      .style('fill', fill)
  }

  /**
   * Render the chart through the given `data`
   */

  render (data) {
    this.data = data
    this.renderAxis(data)
    this.renderLine(data)
  }
}
