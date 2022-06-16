import React from 'react';
import classes from './covid.module.scss'

const Covid = (props) => {
	return (
		<div  className={classes.covidcontainer}>
		    <video src='covidpage.mp4' crossOrigin="anonymous" autoPlay loop={true} muted preload="false" webkit-playsinline="true" playsInline={true} ></video>
			<div className={classes.covidoverlay}>
				<div className={classes.covid_info}>
					<div className={classes.badges}>
						<img src="react-logo.png" alt="React.js"/>
						<img src="google-maps.png" alt="Google Maps"/>
						<button><a href="https://www.covidnewsgps.com">Visit</a></button>
					</div>
					<div className={classes.about}><strong>Covid News GPS</strong> displays Covid-19 data and related news in the user's current location (County) with optional search function to display information from other areas to help with preparing travel plans. Fetches Covid-19 data from <a href=" https://github.com/CSSEGISandData/COVID-19">JHU CSSE COVID-19 Data</a> and news articles from Google.</div>
				</div>
			</div>
		</div>
	)
};

export default Covid;