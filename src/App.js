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
    if (e.key === "Enter" && query.trim() !== "") {
      fetch(url)
        .then(res => res.json(), rej => {
          console.log(rej.responseText())
        })
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
          <div className="query-box col-lg-6 col-8">
            <input
              type="text"
              id="query"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search food..."
              onKeyPress={search}
            /></div>
          <div className="output-box col-lg-6 col-md-8 col-sm-10 col-12">
            <div className="data-box">
              <ul className="data-list">
                {(Object.keys(data).length === 0) ?
                  <section style={{ textAlign: "center", textShadow: "1px 1px 2px black" }}><h2>Food Searcher</h2>
                    <p style={{
                      fontSize: "1.2em"
                    }}>
                      This is food searcher.
                      We provides nutrients data from USDA food central.
              
                      Please search food by its english name.
           
                      ex: "salmon", "chicken breast", etc.
                      </p>
                  </section>
                  :
                  data.map((d, idx) => {
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
    </div >
  );
}

export default App;

