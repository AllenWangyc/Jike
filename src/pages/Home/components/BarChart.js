import { useRef, useEffect } from "react"
import * as echarts from 'echarts'

const BarChart = ({ titleText }) => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 1. get rendering DOM
    const chartDOM = chartRef.current

    // 2. initiate and create chart instance
    const myChart = echarts.init(chartDOM)

    // 3. chart parameters
    const option = {
      title: {
        text: titleText
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10, 40, 70],
          type: 'bar'
        }
      ]
    }
    // 4. render chart with parameters
    option && myChart.setOption(option)
  }, [])

  return (
    <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
  )
}

export default BarChart