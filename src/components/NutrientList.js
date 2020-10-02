import React from 'react';
import { gatherNutrientData } from './NutrientProcessor'

function NutrientList({ nutrientList }) {
  // Title of each nutrients
  const NUTRIENTS_NAME = [
    'Energy', 'Protein', 'Tot. fat', 'Sat. fat',
    'Tran. fat', 'Carb', 'Sugar', 'Sodium']

  // Id of each nutrients (according to usda)
  const NUTRIENTS_ID = [
    1008, 1003, 1004, 1258,
    1257, 1005, 2000, 1093]

  // Colors for the background bar
  const backgroundColors = [
    "#FF8811bb", "#70CBFFbb", "#A82431bb", "#FF8C42bb",
    "#FCF6BDbb", "#FF90B3bb", "#FF4782bb", "#C7BDC0bb"]

  let nutrients = gatherNutrientData(nutrientList, NUTRIENTS_NAME, NUTRIENTS_ID, "list")

  return (
    <div className="data-list__item-info fold">
      <table>
        <tbody>
          <tr>
            <th colSpan="2">per serving (100g)</th>
          </tr>

          {NUTRIENTS_NAME.map((k, idx) => {
            // Get numeric value of the nutrient
            let nutrientValue = parseFloat(nutrients[k].toString().split(" "))

            // Calculating percentage according to weight.
            //  100g per servings, so no need to divide by weight.
            //
            // * Sodium is in units of mg, so divide by 1000,
            // * Energy is divided by the maximum energy possible :
            //   --> (100g * 9kcal/g = 900kcal)
            if (k === "Sodium")
              nutrientValue /= 1000
            else if (k === "Energy")
              nutrientValue /= 9

            return (
              <tr key={idx}>
                <td>
                  {/* Add background color according to the percentage */}
                  <div style={{
                    background:
                      `linear-gradient(
                        to left, 
                        ${backgroundColors[idx]} ${nutrientValue}%,
                        transparent ${nutrientValue}%, 
                        transparent)`,
                    paddingLeft: "5px"
                  }} >
                    {k}
                  </div>
                </td>
                <td>{nutrients[k] || "0 g"}</td>
              </tr>
            )
          })}
        </tbody>
      </table></div>
  )
}

export default NutrientList;