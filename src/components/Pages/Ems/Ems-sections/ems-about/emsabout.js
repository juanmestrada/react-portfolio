import React from 'react';
import classes from './emsabout.module.scss';

const emsAbout = () => (
    <div className={classes.ems_overlay}>
        <div className={classes.ems_info}>
            <div className={classes.badges}>
                <img src="csharp-icon.png" alt="C#"/>
                <img src="unity-icon.png" alt="Unity 3D"/>
                <img src="oculus-icon.png" alt="Oculus"/>
                <img src="blender-icon.png" alt="Blender"/>
            </div>
            <div className={classes.about}><strong>EMS Vr </strong>for Oculus simulates working the tough job of a paramedic. Players must diagnose their patient and find a way to provide proper treatment as they race against the clock to keep their patients stable until the ambulance reaches the hospital. <em>(...in progress)</em></div>
        </div>
    </div>
);

export default emsAbout;