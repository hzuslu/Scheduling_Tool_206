export class Busy {
	day: string;
	time: string

	constructor(day: string, time: string) {
		this.day = day;
		this.time = time
	}
}

export class Instructor {
	name: string;
	busyTimes: Busy[];

	constructor(name: string) {
		this.name = name;
		this.busyTimes = [];
	}

	setBusyTime(day: string, time: string) {
		this.busyTimes.push(new Busy(day, time));
	}

	clearBusyTime(day: string, time: string) {
		this.busyTimes = this.busyTimes.filter(busyTime => busyTime.day !== day || !busyTime.time.includes(time));
	}

	isBusy(day: string, time: string) {
		return this.busyTimes.some(busyTime => busyTime.day === day && busyTime.time.includes(time));
	}
	resetTheBusyTime(){
		this.busyTimes=[];
	}

	toString() {
		return this.name;
	}
}
