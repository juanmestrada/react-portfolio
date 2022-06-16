import React, { useRef, useEffect} from 'react';
import classes from './social.module.scss'

const Social = (props) => {
	const ref = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
		  ([entry]) => {

		    if (entry.isIntersecting) {

			  	entry.target.classList.add(classes.inView);
				
		    }
		  },
		  {
		    threshold: 0.25
		  }
		);

		if (ref.current) {
			ref.current.childNodes.forEach(child => {
		  		observer.observe(child);
			})
		}

	}, []);

	return (
		<div  className={classes.socialcontainer}>
		    
			<div className={classes.socialoverlay} ref={ref}>
				<div className={classes.social_intro}>
					<div>A different kind of social media platform</div>
				</div>

				<div className={classes.social_beyou} value="beyou">
					<div className={classes.beyou_images}>
						<div className={classes.images_wr_l}>
							<div className={classes.b_images_l}>
								<img src="https://images.pexels.com/photos/9501404/pexels-photo-9501404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="chess"/>
							</div>
							<div className={classes.b_images_r}>
								<img src="https://images.pexels.com/photos/532803/pexels-photo-532803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="hiking"/>
							</div>
							<div className={classes.b_images_c}>
								<img src="https://images.pexels.com/photos/9071504/pexels-photo-9071504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="gaming"/>
							</div>
						</div>
						<div className={classes.images_wr_r}>
							<div className={classes.b_images_c}>
								<img src="https://images.pexels.com/photos/6763766/pexels-photo-6763766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="basketball"/>
							</div>
							<div className={classes.b_images_l}>
								<img src="https://images.pexels.com/photos/8629097/pexels-photo-8629097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="baking"/>
							</div>
							<div className={classes.b_images_r}>
								<img src="https://images.pexels.com/photos/5029923/pexels-photo-5029923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="gardening"/>
							</div>
						</div>
					</div>

					<div className={classes.beyou_about}>
						<div>For those with passion</div>
					</div>
				</div>

				<div className={classes.social_diversity} ref={ref}  value="diversity">
					<div className={classes.diversity_images}>
						<img className={classes.d_images_l} src="https://images.pexels.com/photos/8745181/pexels-photo-8745181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="women boxer"/>
						
						<img className={classes.d_images_c} src="https://images.pexels.com/photos/7675929/pexels-photo-7675929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="person in drag"/>
						
						<img className={classes.d_images_r} src="https://images.pexels.com/photos/5301698/pexels-photo-5301698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="person with vitiligo"/>
					</div>

					<div className={classes.diversity_about}>
						<div>For those that feel different</div>
					</div>
				</div>

				<div className={classes.social_passion} value="passion">
					<div className={classes.passion_about}>
						<div>For those with conviction</div>
					</div>

					<div className={classes.passion_images}>
						<div className={classes.p_images_l} ></div>
						<div className={classes.p_images_c} ></div>
						<div className={classes.p_images_r} ></div>
					</div>
				</div>

				<div className={classes.social_love} value="love">
					<div className={classes.love_about}>
						<div>For those that just want to belong</div>
					</div>

					<div className={classes.love_images}>
						<video src='trummi-belong.mp4' crossOrigin="anonymous" autoPlay loop={true} muted preload="false" webkit-playsinline="true" playsInline={true} ></video>
					</div>
				</div>

				<div className={classes.social_info}>
					<div className={classes.info_about}>
						<div className={classes.info_title}>Trummi</div>
						<div className={classes.info_subtitle}>Be your<span className={classes.subtitle_strong}><strong>true</strong></span>self</div>

						<button><a href="https://www.trummi.com" rel="noopener noreferrer" target="_blank">Visit Trummi</a></button>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Social;