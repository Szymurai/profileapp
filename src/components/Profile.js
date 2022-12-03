// Material Icon
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Icon from "@mdi/react";
import { mdiAccountStar } from "@mdi/js";
// import { makeStyles } from "@material-ui/core/styles";

// styles
import "./Profile.css";
const Profile = () => {
	const style = {
		position: "absolute",
		left: "76.94%",
		right: "15.96%",
		top: "66.64%",
		bottom: "26.91%",
		width: "47.34px",
		height: "44.29px",
		color: "#19940E",
	};

	return (
		<div className='profile-wrapper'>
			<div className='profile-box'>
				<div className='profile'>
					<div className='profile-img'></div>
					<p className='profile-name'>Name</p>
					<div className='profile-description-box'>
						<p className='profile-age'>
							age: <span></span>
						</p>
						<p className='profile-eye-color'>
							eye color: <span></span>
						</p>
					</div>
					<Icon
						path={mdiAccountStar}
						title='User Profile'
						size={2}
						color='#fff'
						className='account-star-icon'
					/>
					<Grid container>
						<Grid
							item
							xs={1}>
							<CheckCircleIcon style={style} />
						</Grid>
					</Grid>
				</div>
				<button className='next-profile-btn'>next profiles</button>
			</div>
			<p className='myName'>Szymon Szymurai Bytniewski</p>
			<button className='contact-form-btn'>formularz rejestracyjny</button>
		</div>
	);
};

export default Profile;
