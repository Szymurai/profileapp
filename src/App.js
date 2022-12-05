import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { withRouter } from "react-router";
import useFetch from "./hooks/useFetch";

// components
import Profile from "./components/Profile";
import Form from "./components/Form";
// styles
import "./App.css";

function App() {
	const [url, setUrl] = useState("https://swapi.py4e.com/api/people/1/");
	const { data, img, isPending, error } = useFetch(url);
	const [clicks, setClicks] = useState(2);

	const handleClick = () => {
		if (error) {
			setClicks(1);
			setUrl(`https://swapi.py4e.com/api/people/${clicks}/`);
		} else {
			setClicks(clicks + 1);
			setUrl(`https://swapi.py4e.com/api/people/${clicks}/`);
		}
	};
	//Obsługa brakujących osób w API np. pozycja nr 17.
	const handleNextProfileClick = () => {
		setClicks(clicks + 1);
		setUrl(`https://swapi.py4e.com/api/people/${clicks}/`);
	};

	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path='/'>
						<Profile
							url={url}
							data={data}
							img={img}
							isPending={isPending}
							error={error}
							handleClick={handleClick}
							handleNextProfileClick={handleNextProfileClick}
						/>
					</Route>
					<Route path='/form'>
						<Form data={data} />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
