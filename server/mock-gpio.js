// mock-gpio.js
class Gpio {
    constructor(pin, direction) {
        this.pin = pin;
        this.direction = direction;
        console.log(`Mock GPIO initialized on pin ${pin} as ${direction}`);
    }
    writeSync(value) {
        console.log(`Mock GPIO pin ${this.pin} set to ${value}`);
    }
    unexport() {
        console.log(`Mock GPIO pin ${this.pin} unexported`);
    }
}
module.exports = { Gpio };

