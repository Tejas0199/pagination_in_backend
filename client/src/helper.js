import { useRef, useState } from 'react';

export const useApiCaller = () => {
	const [response,setResponse] = useState(null);
	const time = useRef(null);
	const sendRequest = async (url) => {
		
		if(time.current) {
			clearTimeout(time.current);
			time.current = null; 
		}
		time.current = setTimeout(async () => {
			console.log("hello")
			const res = await fetch(url);
			
			console.log(res)
			if(res.status === 200 ){
				const data = await res.json();
				setResponse(data);
			}
		},500)
	}
	return [response,sendRequest,setResponse];
}

