class Event {

    id: number;
    start: Date; // format: "hh:mm"
    duration: number; // format minutes
    level: number = 0;
    top: number = 0;
    height: number = 0;
    width: number = 0;
    left: number = 0;
    backgroundColor: string = "lightblue";

    constructor(id: number, start: string, duration: number) {
        this.id = id;
        // set hours and minutes to date object
        this.start = new Date(new Date().setHours(parseInt(start.split(":")[0]), parseInt(start.split(":")[1])));
        this.duration = duration;
    }
}

export default Event;