// import { useState } from "react";
import ErrorOverlay from "./ErrorOverlay";
import { Link } from "react-router-dom";

// Material Icon
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Icon from "@mdi/react";
import { mdiAccountStar } from "@mdi/js";

// styles
import "./Profile.css";

const Profile = props => {
	const {
		data: profile,
		img: imgUrl,
		isPending,
		error,
		handleClick,
		handleNextProfileClick,
	} = props;

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

	let userName = "";

	if (profile.name) {
		const fullName = profile.name;
		const [name] = fullName.split(" ");
		userName = name;
	}

	return (
		<>
			{error && (
				<ErrorOverlay
					error={error}
					nextProfile={handleNextProfileClick}
					firstProfile={handleClick}
				/>
			)}
			<div className='wrapper'>
				<div className='profile-box'>
					<div className='profile'>
						<div
							className='profile-img'
							style={
								!isPending
									? {
											background: `url(${imgUrl})`,
									  }
									: {
											background: "https://picsum.photos/534/383",
									  }
							}></div>
						<p className='profile-name'>{userName ? userName : "loading..."}</p>
						<div className='profile-description-box'>
							<p className='profile-age'>
								birth year:{" "}
								<span>
									{profile.birth_year === "unknown"
										? "brak daty urodzenia"
										: profile.birth_year}
								</span>
							</p>
							<p className='profile-eye-color'>
								eye color:{" "}
								<span style={{ color: "royalblue" }}>
									{profile.eye_color ? profile.eye_color : "loading..."}
								</span>
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
					<button
						className='next-profile-btn'
						onClick={handleClick}>
						next profiles
					</button>
				</div>
				<p className='myName'>Szymon Szymurai Bytniewski</p>
				<Link
					to={`/form`}
					className='contact-form-btn'>
					<span>formularz rejestracyjny</span>
				</Link>
			</div>
		</>
	);
};

export default Profile;
