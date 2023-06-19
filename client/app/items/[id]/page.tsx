'use client'
import { useEffect, useState } from "react"
import axios from 'axios'

export default function Item({ params }: { params: { id: string } }){
    const [item, setItem] = useState({});
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios({
            url: `http://localhost:3001/api/items/${params.id}`,
          });
  
          setItem(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [setItem]);
        console.log("ASD result", item)
    return(<>
    <div>

    Item Page {item.item?.id}
    </div>
    </>)
  }