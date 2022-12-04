import { useState, useEffect, useRef } from "react";

const useFetch = (url, _options) => {
	const [data, setData] = useState({});
	const [img, setImg] = useState("https://picsum.photos/534/383");
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const options = useRef(_options).current;

	useEffect(() => {
		const controller = new AbortController();
		const control = new AbortController();

		const fetchData = async () => {
			setIsPending(true);

			try {
				const res = await fetch(url, { signal: controller.signal });
				if (res.status === 404) {
					throw new Error(res.statusText);
				}
				const json = await res.json();
				setData(json);
				const imgResponse = await fetch("https://picsum.photos/534/383", {
					signal: control.signal,
				});
				setImg(imgResponse.url);
				setIsPending(false);
				setError(null);
			} catch (err) {
				if (err.name === "AbortError") {
					console.log("The fetch was aborted.");
				} else {
					setIsPending(false);
					setError("Nie można załadować danych.");
					console.log(err.message);
				}
			}
		};

		fetchData();

		return () => {
			controller.abort();
			control.abort();
		};
	}, [url, options]);

	return { data, img, isPending, error };
};

export default useFetch;
