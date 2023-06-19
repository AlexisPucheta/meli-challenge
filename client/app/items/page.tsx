'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import axios from 'axios'

export default function Items(){
    const searchParams = useSearchParams();
    const search = searchParams.get('search')
    const [list, setList] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios({
            url: `http://localhost:3001/api/items?q=${search}`,
          });
  
          setList(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [setList]);
    let elements:JSX.Element[] = list.map((e) => {
    return (<li key={e.item.id}>
        <p>
            {e.item.title}
            </p>
            <a href={`/items/${e.item.id}`}>link</a>
    </li>)
  });
    return (<>
    <h1>home</h1>
    <ul>
    {elements}
    </ul>
    </>)
}
