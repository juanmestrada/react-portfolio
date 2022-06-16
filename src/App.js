import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Ems from './components/Pages/Ems/Ems';
import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import ContactData from './containers/Contact/Contact';
import CS from './components/Pages/CS/cs';
import Warehouse from './components/Pages/Warehouse/Warehouse';
import Covid from './components/Pages/Covid/covid';
import Social from './components/Pages/Social/social';

class App extends React.Component {
	state = {
        showmenu: false,
        videop: "oculus",
        menuclicked: false,
        inview: false
	}
	
    menuToggleHandler = () => {
        this.setState( () => {
            return { showmenu: !this.state.showmenu };
        } );

        if (!this.state.showmenu) {
        	document.documentElement.style.overflow = "hidden"
        } else{
        	document.documentElement.style.overflow = ""
        }
        
    } 

    iconToggleHandler = () => {
        this.setState(() => {
            return { menuclicked: !this.state.menuclicked};
        } );
     
    }

    videoHandler = (newVideo) => {
        this.setState(() => ({
            videop: newVideo
        }));   
    }
	render() {
		
		return (
			<div className='App'>
				<Layout menuToggleClicked={this.menuToggleHandler} iconToggleClicked={this.iconToggleHandler} open={this.state.showmenu}  onMouseEnter={this.videoHandler}>
					<Switch>
						<Route path="/project1" component={Social} />
						<Route path="/project2" component={CS} />
						<Route path="/project3" component={Warehouse} />
						<Route path="/project4" component={Ems} />
                        <Route path="/project5" component={Covid} />
						<Route path="/contact" component={ContactData}/>
						<Route path="/" exact  render={(props) => <Home currentvideo={this.state.videop}/>}/>
					</Switch>
				</Layout>
			</div>
		)
	}
};

export default App;