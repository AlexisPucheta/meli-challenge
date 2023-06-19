'use client'
import { useEffect, useState } from "react";

const Home = () => {
  const [results,setResults] = useState([])
  useEffect(()=>{
  fetch('http://localhost:3001/api/items?q=iphone')
  .then((res) => res.json())
  .then((data) => {
      console.log(data.results)
      setResults(data)
  });},[])

  let elements:JSX.Element[] = results.map((result) => {
  return (<li key={result.item.id}>{result.item.title}</li>)
});
  return <>
  <h1>home</h1>
  <ul>
  {elements}
  </ul>
  </>
}

export default Home