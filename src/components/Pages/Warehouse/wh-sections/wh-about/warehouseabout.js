import React from 'react';
import classes from './warehouseabout.module.scss';

const warehouseAbout = () => (
    <div className={classes.warehouseAbout}>
        <div className={classes.beforediv}>
            <div className={classes.scroll_text}>
                <h1>WareHouse Simulator VR</h1>
            </div>
        </div> 
        <div className={classes.lift}>
            <div className={classes.lift_left}>
                <p><strong>Warehouse Vr </strong>for Oculus puts you in the seat of your very own forklift. Players can carelessly interact with objects without needing to worry about catastrophic failure or risk of injury, something that could never be done in the real world. It can be used for fun with the potential for training purposes. <em>(...in progress)</em></p>
            </div>
            <div className={classes.lift_right}>
                <div className={classes.lift_right_img}>
                    <img src='rm6000.gif' alt="RM6000"/>
                </div>  
            </div>
        </div>
        <div className={classes.lift_icons}>
            <div className={[classes.icons_csharp, classes.icon].join(" ")}></div>
            <div className={[classes.icons_unity, classes.icon].join(" ")}></div>
            <div className={[classes.icons_oculus, classes.icon].join(" ")}></div>
            <div className={[classes.icons_blender, classes.icon].join(" ")}></div>
        </div>
        <div className={classes.liftinfo}>
            <img src='liftconsole2.png' alt="Lift Console"/>
        </div>
        <div className={classes.liftsect}>
            <div className={classes.liftsect_left}>
                <img src='blender.png' alt="Blender Logo"/>
            </div>
            <div className={classes.liftsect_right}>
                <p>This first person vr game is modeled in Blender and Unity 3D using realistic graphics with real world dimensions.</p>
            </div>
        </div>
        <div className={classes.unity}></div>
    </div>
);

export default warehouseAbout;