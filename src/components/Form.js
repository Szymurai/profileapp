import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";

// style
import "./Form.css";

function Form(props) {
	const { created, name, vehicles } = props.data;
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [accept, setAccept] = useState(false);
	const [errors, setErrors] = useState({
		email: false,
		phone: false,
		accept: false,
	});
	const ref = useRef(null);
	const checkbox = ref.current;
	if (errors.accept) {
		if (checkbox) {
			checkbox.className = "accept error-outline";
		}
	} else {
		if (checkbox) {
			checkbox.className = "accept";
		}
	}
	const inputEmailRef = useRef(null);
	const emailInput = inputEmailRef.current;
	if (errors.email) {
		if (emailInput) {
			emailInput.className = "error-border";
		}
	} else {
		if (emailInput) {
			emailInput.className = "";
		}
	}
	const inputPhoneRef = useRef(null);
	const phoneInput = inputPhoneRef.current;
	if (errors.phone) {
		if (phoneInput) {
			phoneInput.className = "error-border";
		}
	} else {
		if (phoneInput) {
			phoneInput.className = "";
		}
	}
	const history = useHistory();

	const messages = {
		email_incorrect: "Nieprawidłowy format adresu e-mail",
		phone_incorrect: "Nieprawidłowy numer telefonu",
		accept_incorrect: "Wymagana akceptacja regulaminu",
	};

	const start_wars_data = { created, name, vehicles };

	const { postData, apiData } = useFetch(
		"https://swapi.py4e.com/api/people/1/",
		"POST"
	);

	const formValidation = () => {
		let emailValidation = false;
		let phoneValidation = false;
		let acceptValidation = false;
		let correct = false;

		if (phone.length === 9) {
			phoneValidation = true;
		}

		if (email.indexOf("@") !== -1) {
			emailValidation = true;
		}

		if (accept) {
			acceptValidation = true;
		}

		if (emailValidation && phoneValidation && acceptValidation) {
			correct = true;
		}

		return {
			correct,
			emailValidation,
			phoneValidation,
			acceptValidation,
		};
	};

	const handleSubmit = e => {
		e.preventDefault();
		const validation = formValidation();
		console.log(validation);
		if (validation.correct) {
			postData({ login, password, email, phone, accept, ...start_wars_data });
			//apiData nie zwróci  true, ponieważ nie można wykonać na API metody POST
			//W celu przetestowania można wpisać zamiast apiData => true, wówczas formularz zostanie wyczyszczony
			// apiData / true
			if (true) {
				setLogin("");
				setPassword("");
				setEmail("");
				setPhone("");
				setAccept(false);
				setErrors({
					email: false,
					phone: false,
					accept: false,
				});
			}
		} else {
			setErrors({
				email: !validation.emailValidation,
				phone: !validation.phoneValidation,
				accept: !validation.acceptValidation,
			});
		}

		console.log({ login, password, email, phone, accept, ...start_wars_data });
	};

	const handleChange = e => {
		const name = e.target.name;
		const type = e.target.type;
		if (
			type === "text" ||
			type === "password" ||
			type === "email" ||
			type === "number"
		) {
			const value = e.target.value;
			if (name === "login") {
				setLogin(value);
			} else if (name === "password") {
				setPassword(value);
			} else if (name === "email") {
				setEmail(value);
			} else if (name === "number") {
				setPhone(value);
			}
		} else if (type === "checkbox") {
			const checked = e.target.checked;
			setAccept(checked);
		}
	};

	// redirect the user when we get data response
	// apiData nie zwraca true, ze względu na brak uprawnień do wykonania metody POST w API.
	useEffect(() => {
		if (apiData) {
			history.push("/");
		}
	}, [apiData, history]);

	return (
		<div className='wrapper'>
			<form
				className='form'
				onSubmit={handleSubmit}
				noValidate>
				<h1 className='form-title'>
					formularz rejestracyjny<div className='line'></div>
				</h1>
				<div className='content'>
					<label htmlFor='login'>Login:</label>
					<input
						type='text'
						id='login'
						name='login'
						onChange={handleChange}
						value={login}
						required
					/>
					<label htmlFor='pass'>Hasło:</label>
					<input
						type='password'
						id='pass'
						name='password'
						onChange={handleChange}
						value={password}
						required
					/>
					<label htmlFor='email error-input'>E-mail:</label>
					<input
						type='email'
						id='email'
						name='email'
						onChange={handleChange}
						value={email}
						required
						ref={inputEmailRef}
					/>
					{errors.email && (
						<small className='error error-input'>
							{messages.email_incorrect}
						</small>
					)}
					<label htmlFor='phone'>Numer telefonu:</label>
					<input
						type='number'
						id='phone'
						name='number'
						onChange={handleChange}
						value={phone}
						required
						ref={inputPhoneRef}
					/>
					{errors.phone && (
						<small className='error error-input'>
							{messages.phone_incorrect}
						</small>
					)}
					<div className='privacy'>
						<input
							className='accept'
							type='checkbox'
							id='accept'
							name='checked'
							onChange={handleChange}
							checked={accept}
							required
							ref={ref}
						/>
						<label htmlFor='accept'>Akceptuję Regulamin</label>
						{errors.accept && (
							<small className='error error-privacy'>
								{messages.accept_incorrect}
							</small>
						)}
					</div>

					<div className='center'>
						<button className='submit'>
							<span>zapisz</span>
						</button>
						<p id='success'></p>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Form;
