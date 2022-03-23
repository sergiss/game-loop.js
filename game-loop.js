export default class GameLoop {

    constructor(listener, fps = 60) {
        this.listener = listener;
        this.stepTime = 1 / fps; // set step time from fps
        this.step = this.step.bind(this); // set the scope of 'this'
    }

    start() {
        if (!this.running) { // if is stopped
            this.running = true; // set running
            this.accum = 0; // clear accumulated time
            this.startTime = 0; // clear start time
            if(this.listener.create) this.listener.create(); // optional create
            requestAnimationFrame(this.step); // start loop
        }
    }

    stop() {
        this.running = false; // set stopped
        if(this.listener.dispose) this.listener.dispose(); // optional dispose
    }

    step(time) {
        if (this.running) { // check if is running
            requestAnimationFrame(this.step); // request next step
            const diff = time - this.startTime; // compute time of previous step
            this.startTime = time; // set start time
            this.accum += diff / 1000; // accumulate time
            // iterate as long as the accumulated time is greater than step time
            while (this.accum >= this.stepTime) { 
                this.accum -= this.stepTime; // decrease accumulated time
                this.listener.update(); // call update
            }
            this.listener.render(); // call render
        }
    }

}