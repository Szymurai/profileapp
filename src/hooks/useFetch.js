import { useState, useEffect } from "react";

const useFetch = (url, method = "GET") => {
	const [data, setData] = useState({});
	const [img, setImg] = useState("https://picsum.photos/534/383");
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState(null);

	const postData = postData => {
		setOptions({
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		});
	};

	useEffect(() => {
		const controller = new AbortController();
		const control = new AbortController();

		const fetchData = async fetchOptions => {
			setIsPending(true);

			try {
				const res = await fetch(url, {
					...fetchOptions,
					signal: controller.signal,
				});
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

		if (method === "GET") {
			fetchData();
		}

		if (method === "POST" && options) {
			fetchData(options);
		}
		return () => {
			controller.abort();
			control.abort();
		};
	}, [url, options, method]);

	return { data, img, isPending, error, postData };
};

export default useFetch;
