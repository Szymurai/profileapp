// styles
import "./ErrorOverlay.css";

function ErrorOverlay(props) {
	const { error, nextProfile, firstProfile } = props;
	return (
		<div className='background-overlay'>
			<div className='box-overlay'>
				<p>{error}</p>
				<button
					className='next-profile error-btn'
					onClick={nextProfile}>
					Try Next Profile?
				</button>
				<p>Or</p>
				<button
					className='first-profile error-btn'
					onClick={firstProfile}>
					from 1 profile
				</button>
			</div>
		</div>
	);
}

export default ErrorOverlay;
