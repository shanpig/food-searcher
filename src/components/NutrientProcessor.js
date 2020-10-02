
const gatherNutrientData = function (foodNutrients, NUTRIENTS_NAME, NUTRIENTS_ID, mod = "list") {
  let nutrientDict = {}
  // initialize dictionary
  NUTRIENTS_NAME.forEach(name => {
    nutrientDict[name] = 0;
  })

  // gather data to dictionary
  foodNutrients.forEach(n => {
    if (NUTRIENTS_ID.includes(n.nutrientId)) {
      let index = NUTRIENTS_ID.indexOf(n.nutrientId);
      nutrientDict[NUTRIENTS_NAME[index]] = parseFloat(n.value)
      if (mod === "list")
        nutrientDict[NUTRIENTS_NAME[index]] +=
          ` ${n.unitName.toLowerCase()}`
    }
  });

  // console.log("nutrientDict:\n", nutrientDict)
  // console.log('called')
  return nutrientDict;
};

export { gatherNutrientData };