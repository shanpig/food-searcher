import React, { useState } from 'react';
import './css/App.css'
import NutrientList from './components/NutrientList'
// import NutrientChart from './components/NutrientChart'


function App() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const pageSize = 10
  const key = "0SZt1LrnaarcT0ZcxTZ662ELwczfBaaxXSmU5PS7"
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${key}&pageSize=${pageSize}`


  function search(e) {
    if (e.key === "Enter") {
      fetch(url)
        .then(res => res.json())
        .then(d => {
          document.querySelector('.data-box').scrollTo({ top: 0 })
          document.querySelectorAll(".data-list__item-info").forEach(item => item.classList.add('fold'))
          setData(d.foods)
          console.log("data from fetch:\n", d.foods)
          setQuery("")

        })
      console.log(query)
    }
  }
  return (

    <div className='App container-fluid'>
      <div className="row">
        <main className="col-12">
          <div className="query-box col-8">
            <input
              type="text"
              id="query"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search food..."
              onKeyPress={search}
            /></div>
          <div className="output-box col-lg-8 col-md-10 col-12">
            {/* <div className="chart-box">{
              data.map((d, idx) => {
                return (
                  <NutrientChart key={idx} nutrientList={d.foodNutrients}></NutrientChart>
                )
              })
            }
            </div> */}
            <div className="data-box">
              <ul className="data-list">{data.map((d, idx) => {
                return (
                  <li key={idx} className="data-list__item" onClick={(e) => {
                    e.currentTarget.querySelector(".data-list__item-info").classList.toggle("fold")
                  }}>
                    <div className="data-list__item-head">
                      <div>{d.description.toLowerCase()}</div>
                      <i>{d.brandOwner || ""}</i>
                    </div>
                    <NutrientList
                      nutrientList={d.foodNutrients}></NutrientList>
                  </li>
                )
              }
              )}</ul>
            </div>
          </div>
        </main>
        <footer className="col-12">
          {String.fromCharCode(169)} 2020 edit by shanpig
        </footer>
      </div>
    </div>
  );
}

export default App;

