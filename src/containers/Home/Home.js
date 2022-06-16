import React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import ImageZoom from '../../components/imagezoom/imagezoom';
import Transition from 'react-transition-group/Transition';
import classes from './../Home/Home.module.scss';

let camera, scene, renderer, video, composer;

let isDeviceOrientationListener = false;//if true, deviceOriention event is attached
let usingMouse = false; //if true, mouseMove event is attached

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

//BACKUP (LIMITS)
////rotation mobile
// var quatxmin = -0.23648609330461312;
// var quatxmax = 0.10918776810533176;
// var quatymin = -0.33380685923377096;
// var quatymax = 0.25881904510252074;
////quaternion mobile
// var rotxmin = -0.7679448708775053;
// var rotxmax = 0.0698131700797732;
// var rotymin = -0.7504915783575621;
// var rotymax = 0.6283185307179586;

//let rotateDegrees;

// gamma: left to right
let leftToRight;
// beta: front back motion
let frontToBack;

let check = false;
let vidsrc;
		
class Home extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			modelLoading: true,
			modal: true,
		 	isMobile: false,
			vidfromhover: "oculus",
			currentvideo: this.props.currentvideo
		};

		this.videoRef = React.createRef();
		
	}

	componentDidMount() {

		const _this = this;

		// FUNCTION TO CHECK IF MOBILE DEVICE
		window.mobileAndTabletCheck = function() {
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);//eslint-disable-line
			return check;
		};

		window.mobileAndTabletCheck();

		//SCENE
		scene = new THREE.Scene();
		scene.background = new THREE.Color('black');

		//CAMERA
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, .1, 1000);
	
		camera.position.z = .75;
		camera.position.y = .3;
		camera.position.x = 0;
		camera.lookAt( scene.position );
		
		//lights
		const alight = new THREE.AmbientLight (0x0000FF, .06);
		const plight = new THREE.PointLight(0xf0f0f0, .06, 100, 2);
		plight.position.set(0,.1,2);
		plight.castShadow = true;
		
		scene.add(alight, plight);

		//RENDERER
		renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );

		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = .8;
	
		this.mount.appendChild(renderer.domElement);

		//VIDEO
		video = this.refs.videoRef;
		let texture = new THREE.VideoTexture(video);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		// texture.format = THREE.RGBFormat;
		//texture.crossOrigin = 'anonymous';

		video.load();
		video.play();

		//VIDEO SCREEN TEXTURE
		const imageObject = new THREE.Mesh(new THREE.PlaneGeometry(.615, .38), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }));
		imageObject.position.x = .025;
		imageObject.position.y = 0.14;
		imageObject.position.z = -0.03;
		imageObject.rotation.x = -0.175;

		//LIGHT EMMITTING FROM SCREEN
		RectAreaLightUniformsLib.init();
		const rectLight = new THREE.RectAreaLight( 0xf0f0f0, 6.5,  .715, .48 );
		rectLight.position.set(0.025, 0.14, -0.028);
		rectLight.rotation.x = 2.965;
		
		scene.add( imageObject );
		scene.add( rectLight );

		const renderScene = new RenderPass( scene, camera );

		composer = new EffectComposer( renderer );
		composer.addPass( renderScene );

		//OBJECT LOADER
		const manager = new THREE.LoadingManager();
		const loader = new GLTFLoader(manager);

		loader.load('pc.glb', (gltf) => {
			let mesh = gltf.scene;
			mesh.position.x = .46;
			mesh.position.y = -0.9;
			mesh.position.z = .17;
	
			manager.onLoad = () => {

				scene.add(mesh);

				_this.setState(
					{
						modelLoading: false
					}
				)
		    
		    };
			
		});
		
		//adjust canvas on window resize
		window.addEventListener('resize', this.handleResize, false);
	
		//IF MOBILE DEVICE USE (deviceOrientation) FOR CAMERA MOVEMENT ELSE USE MOUSE
		if (window.DeviceOrientationEvent && check) {
			isDeviceOrientationListener = true;

			this.setState({
				isMobile: true
			})

			window.addEventListener("deviceorientation", this.motionHandler, false);
			this.mobileAnimate();
		}else{
			usingMouse = true;
			window.addEventListener( 'mousemove', this.mouseMoveHandler, false );
			this.animate();
		}
		
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if (prevState.currentvideo !== nextProps.currentvideo){
			return {
				vidfromhover: nextProps.currentvideo,
				currentvideo: nextProps.currentvideo
			}
		}
		return null;
	}
	
	componentDidUpdate(){
		
		const playPromise = video.play();

		if (playPromise !== undefined) {
			playPromise
			.then(_ => {
				// Automatic playback started!
				// Show playing UI.
			})
			.catch(error => {
				// Auto-play was prevented
			});
		}
	}	
	
	componentWillUnmount() {
		video.pause();
		cancelAnimationFrame(this.mobileAnimate);
		this.mount.removeChild(renderer.domElement);

		window.removeEventListener('resize', this.handleResize, false);

		if(isDeviceOrientationListener){
			window.removeEventListener("deviceorientation", this.motionHandler, false);
		}
		if(usingMouse){
			window.addEventListener( 'mousemove', this.mouseMoveHandler, false );
		}
		
	}

	animate = () => {
		let _this = this;
		
		setTimeout( function() {
	        requestAnimationFrame(_this.animate);
	    }, 1000 / 30 );
		 
		camera.lookAt( scene.position );
		target.x = ( 1 - mouse.x ) * 0.002;
		target.y = ( 1 - mouse.y ) * 0.002;
		
		camera.rotation.x += 0.05 * ( target.y - camera.rotation.x );
		camera.rotation.y += 0.05 * ( target.x - camera.rotation.y );
		composer.render( scene, camera );
		

	}
	
	mobileAnimate = () => {
		let _this = this;

		setTimeout( function() {
	        requestAnimationFrame(_this.mobileAnimate);
	    }, 1000 / 30 );
		
		camera.lookAt(scene.position);

		camera.rotation.x += ( frontToBack - camera.rotation.x ) * 0.005;
		camera.rotation.y += ( - leftToRight - camera.rotation.y ) * 0.005;
	
		composer.render( scene, camera );
		
	}

	motionHandler = (event) => {
		isDeviceOrientationListener = true;

		// alpha: rotation around z-axis
		//rotateDegrees = event.alpha;

		//gamma: left to right
		leftToRight = event.gamma;

		//beta: front back motion
		frontToBack = event.beta;
	}

	mouseMoveHandler = (evt) => {
		
		mouse.x = ( evt.clientX - windowHalf.x );
		mouse.y = ( evt.clientY - windowHalf.x );

	}

	handleResize = () => {

		camera.aspect = window.innerWidth / window.innerHeight;
    	camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
		composer.setSize( window.innerWidth, window.innerHeight );
	}

	videoHandler = () => {
		switch (this.state.vidfromhover) {
			case this.state.vidfromhover === "oculus":
				vidsrc = "preview.mp4";
			  	break;
			case this.state.vidfromhover === "social":
			  	vidsrc = "trummi.mp4";
			  	break;
			case this.state.vidfromhover === "warehouse":
				vidsrc = "warehousevr.mp4";
			  	break;
			case this.state.vidfromhover === "ems":
				vidsrc = "emsvr1.mp4";
				break;
			case this.state.vidfromhover === "covid":
				vidsrc = "covidsite.mp4";
			  	break;
			default:
				vidsrc = "preview.mp4";
		}
		
	}

	render() {
		
		if (this.state.vidfromhover === "oculus"){
			vidsrc = "preview.mp4";
		}
		else if (this.state.vidfromhover === "social"){
			vidsrc = "trummi.mp4";
		}
		else if (this.state.vidfromhover === "warehouse"){
			vidsrc = "warehousevr.mp4";
		}
		else if (this.state.vidfromhover === "ems"){
			vidsrc = "emsvr1.mp4";
		}
		else if (this.state.vidfromhover === "covid"){
			vidsrc = "covidsite.mp4";
		}
		else{
			vidsrc = "preview.mp4";
		}
		return (
			<div className={classes.main} ref={(mount) => {this.mount = mount} }  >
				<Transition 
					in={this.state.modelLoading} 
					timeout={{
						appear: 1000,
						enter: 9000,
						exit: 10000
					   }}
					unmountOnExit>
					{state => ( <ImageZoom loading={this.state.modelLoading} trans={state}/>
					)}
				</Transition>
				<video src={vidsrc} crossOrigin="anonymous" autoPlay loop={true} height="1024" width="1024" muted preload="false" webkit-playsinline="true" playsInline={true} ref="videoRef" style={{display: 'none'}} ></video>
			</div>
		)
	}
};

export default Home;