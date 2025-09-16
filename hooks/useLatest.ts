import { useEffect, useState } from "react"

export const useLatest = () => {
    const [data , setData] = useState<any[]>([]);
    const [loading , setLoading] = useState<boolean>(false);
    const [error , setError] = useState<any>("");
    const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=a&orderBy=newest&maxResults=10&key=${API_KEY}`

    useEffect(() => {
        const loadLatest = async() => {
            try {
                setLoading(true)
                const res = await fetch(url);
                if (!res.ok) {
                  throw new Error(`Google Books API error: ${res.status}`);
                }
                const data = await res.json()
                setData(data.items || [])
            } catch (error) {
                console.log("ERROR in useLatest:\n", error)
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        loadLatest();
    }, []);

    return { data , loading , error};
}