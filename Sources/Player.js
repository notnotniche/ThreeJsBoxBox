import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

export class Player {
    constructor(camera, rendererDomElement) {
        this.camera = camera;
        this.controls = new FirstPersonControls(this.camera, rendererDomElement);

        // Configure the controls
        this.controls.movementSpeed = 10;
        this.controls.lookSpeed = 0.1;
    }

    update(deltaTime) {
        // Update the controls
        this.controls.update(deltaTime);
    }
}