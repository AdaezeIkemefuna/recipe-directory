import { useEffect, useState } from 'react';

export function useFetch(url, method = "GET") {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null)

    const postData = (postData) => {
        setOptions({
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    }
   
    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async(fetchOptions) => {
            setIsPending(true)

            try{
                const res = await fetch(url, { ...fetchOptions, signal: controller.signal})
                    if(!res.ok){
                        throw new Error(res.statusText)
                    }
                const json = await res.json();

                setError(null)
                setIsPending(false)
                setData(json)
            } catch(err){
                setIsPending(false)
                setError('could not fetch data');
            }
        }
            
        if(method === "GET"){
            fetchData();
        }
        if(method === "POST" && options) {
            fetchData(options)
        }
        
       

            return () => {
                controller.abort()
            }
        }, [url, options, method])

    
    return { data, isPending, error, postData}
}
