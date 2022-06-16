import React from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import classes from './../CS/cs.module.scss';

let camera, tGeometry, scene, renderer, glow, gameRectLight, stopRectLight, spotLight, text1Mesh, text2Mesh;

// floor
let floorMat;

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

// gamma: left to right
let leftToRight;

// beta: front back motion
let frontToBack;

let check = false;

		
class CS extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			model1Loaded: false,
			model2Loaded: false,
			modal: true,
		 	isMobile: false
		};
		
	}

	componentDidMount() {

		const _this = this;

		// FUNCTION TO CHECK IF MOBILE DEVICE
		window.mobileAndTabletCheck = function() {
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);//eslint-disable-line
			return check;
		};

		window.mobileAndTabletCheck();

		// Glow
		glow = 0.5;


		//SCENE
		scene = new THREE.Scene();


		//CAMERA
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1500);
	
		camera.position.set(10, 10, 250);
		camera.lookAt( 0, 0, 0 );


		//RENDERER
		renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );

		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
	
		this.mount.appendChild(renderer.domElement);


		//LIGHT from text
		RectAreaLightUniformsLib.init();

		// "Game" - white
		gameRectLight = new THREE.RectAreaLight( 0xffffff, 2,  80, 30 );
		gameRectLight.position.set(-20, 30, 150);

		gameRectLight.rotation.set(5,0,0);

		// "Stop" -red
		stopRectLight = new THREE.RectAreaLight( 0xff0000, 2,  80, 30 );
		stopRectLight.position.set(100, 30, 150);

		stopRectLight.rotation.set(5,0,0);
		
		scene.add( gameRectLight, stopRectLight );
		
		// spotlight
		spotLight = new THREE.SpotLight( 0xffffff, 1 );
		spotLight.position.set( 0, 150, 450 );
		spotLight.angle = Math.PI / 4;
		spotLight.penumbra = .125;
		spotLight.decay = 1.9;
		spotLight.distance = 400;
		spotLight.exposure = .75;

		spotLight.castShadow = true;
		spotLight.shadow.mapSize.width = 512;
		spotLight.shadow.mapSize.height = 512;
		spotLight.shadow.camera.near = 10;
		spotLight.shadow.camera.far = 400;
		spotLight.shadow.focus = 1;

		scene.add( spotLight );

		// FLOOR MODEL
		function loadGround() {

			const manager = new THREE.LoadingManager();
			const textureLoader = new THREE.TextureLoader(manager);
		    
		    floorMat = new THREE.MeshStandardMaterial( {
				roughness: 0.8,
				color: 0xffffff,
				metalness: 0.2,
				bumpScale: 0.0005
			} );

		    textureLoader.load( "seamless_moon.webp", function ( map ) {

				map.wrapS = THREE.RepeatWrapping;
				map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 4;
				map.repeat.set( 10, 24 );
				map.encoding = THREE.sRGBEncoding;
				floorMat.map = map;
				floorMat.needsUpdate = true;

			} );

			textureLoader.load( "seamless_moon_normal.png", function ( map ) {

				map.wrapS = THREE.RepeatWrapping;
				map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 4;
				map.repeat.set( 10, 24 );
				floorMat.bumpMap = map;
				floorMat.needsUpdate = true;

			} );

			const floorGeometry = new THREE.PlaneGeometry( 800, 600 );
			const floorMesh = new THREE.Mesh( floorGeometry, floorMat );

			floorMesh.receiveShadow = true;
			floorMesh.rotation.x = - Math.PI / 2.0;

			manager.onLoad = () => {

				scene.add( floorMesh );

				_this.setState(
					{
						model1Loaded: true
					}
				)
		    
		    };

		}

		//FONT MODEL
		const text_game = "Game";
		const text_stop = "Stop";

		function loadFontModel() {

			const manager = new THREE.LoadingManager();
			const textLoader = new FontLoader(manager);

			// "GAME" - font model
			const text1 = textLoader.load('Oswald_SemiBold.json', (font) => {

				tGeometry = new TextGeometry(text_game, {
					font: font,
					size: 40,
					height: 5,
					curveSegments: 12,
					bevelEnabled: true,
					bevelThickness: 5,
					bevelSize: 2,
					bevelOffset: 1.2,
					bevelSegments: 15
				})

				text1Mesh = new THREE.Mesh(tGeometry, [
					new THREE.MeshPhongMaterial({ emissive: 0xffffff, emissiveIntensity: .65 }),
					new THREE.MeshPhongMaterial({ color: 0x11151c }) 
				])
				
				text1Mesh.position.set(-75, 15, 100);

				text1Mesh.castShadow = true;
				text1Mesh.receiveShadow = true;

			});

			// "STOP" - font model
			const text2 = textLoader.load('Oswald_SemiBold.json', (font) => {
				
				tGeometry = new TextGeometry(text_stop, {
					font: font,
					size: 40,
					height: 5,
					curveSegments: 12,
					bevelEnabled: true,
					bevelThickness: 5,
					bevelSize: 2,
					bevelOffset: 1.2,
					bevelSegments: 15
				})

				text2Mesh = new THREE.Mesh(tGeometry, [
					new THREE.MeshPhongMaterial({ emissive: 0xcf0909, emissiveIntensity: .65 }),
					new THREE.MeshPhongMaterial({ color: 0x3c3c3e }) 
				])
				
				text2Mesh.position.set(52, 15, 100);

				text2Mesh.castShadow = true;
				text2Mesh.receiveShadow = true;

			});

			manager.onLoad = () => {
				scene.add(text1Mesh);
				scene.add(text2Mesh);

				_this.setState(
					{
						model2Loaded: true
					}
				)

		    };

		}
		
		// Load models
		loadGround();
		loadFontModel();


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
	
	componentDidUpdate(){
		
	}	
	
	componentWillUnmount() {
		
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
		
		gameRectLight.intensity = glow;
		stopRectLight.intensity = glow;

		renderer.render( scene, camera );
	
	}
	
	mobileAnimate = () => {
		let _this = this;

		setTimeout( function() {
	        requestAnimationFrame(_this.mobileAnimate);
	    }, 1000 / 30 );
		
		camera.lookAt(scene.position);

		camera.rotation.x += ( frontToBack - camera.rotation.x ) * 0.005;
		camera.rotation.y += ( - leftToRight - camera.rotation.y ) * 0.005;
	
		renderer.render( scene, camera );
		
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
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	render() {
		
		return (
			<div className={[classes.cs_container, this.state.model1Loaded && this.state.model2Loaded ? classes.loaded : "" ].join(' ')} ref={(mount) => {this.mount = mount} }  >
				<div className={classes.overlay} >
					<div className={classes.about} >
						<div className={classes.link} >
							<button><a href="http://www.citadelscandal.com" rel="noopener noreferrer" target="_blank">Visit</a></button>
						</div>

						<div className={classes.info} >
							Outlining the frenzy over GameStop (GME), the video game and electronics company, taking place on social media as millions of small retail investors take on billion-dollar hedge funds.
						</div>
					</div>
				</div>
			</div>
		)
	}
};

export default CS;