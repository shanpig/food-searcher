import React, { useState, useEffect } from 'react'
import { gatherNutrientData } from "./NutrientProcessor"
import { Chart } from 'chart.js'
import 'chartjs-plugin-colorschemes'

function NutrientChart({ nutrientList }) {
  const NUTRIENTS_NAME = [
    'Prot.',
    'Tot. fat',
    'Sat. fat',
    'Tran. fat',
    'Carb',
    'Sugar',
  ]
  const NUTRIENTS_ID = [
    1003, 1004, 1258, 1257, 1005, 2000,
  ]
  const chartBackgroundColor = [
    "#70CBFF", "#A82431", "#FF8C42", "#FCF6BD", "#FF90B3", "#FF4782"
  ]
  const [nutrients, setNutrients] = useState({})


  useEffect(() => {
    let _nutrients = gatherNutrientData(nutrientList, NUTRIENTS_NAME, NUTRIENTS_ID, "chart")
    console.log("_nutrients:\n", _nutrients)
    setNutrients(_nutrients)
  }, [nutrientList])

  useEffect(() => {
    renderChart()
  }, [nutrients])

  function renderChart() {
    const chart = document.querySelector("#chart")
    const ctx = chart.getContext('2d')
    if (window.pie)
      window.pie.destroy()
    window.pie = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [{
          data: Object.values(nutrients),
          backgroundColor: chartBackgroundColor,
          borderWidth: 2,
          fontSize: 14,
          label: "nutrient",
        }],
        labels: Object.keys(nutrients)
      },
      options: {
        cutoutPercentage: 50,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 18
            },
          }],
        },
        legend: {
          display: false,
        },
        plugins: {
          colorschemes: {
            scheme: 'brewer.SetOne9'
          }
        }

      }
    })
  }
  return (
    <canvas id="chart"></canvas>
  )
}

export default NutrientChart