export class Classroom {
	name: string;
	capacity: number;
	room: { [key: string]: { [key: string]: number } } = {
		"Monday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 },
		"Tuesday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 },
		"Wednesday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 },
		"Thursday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 },
		"Friday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 }
	};
	constructor(name: string, capacity: number) {
		this.name = name;
		this.capacity = capacity;
	}
	hasRoom(day: string, time: string) {
		return this.room[day][time] === 0;
	}
	resetClassroom(){
		this.room = {
			"Monday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 },
			"Tuesday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 },
			"Wednesday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 },
			"Thursday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 },
			"Friday": { "8:30": 0, "9:30": 0, "10:30": 0, "11:30": 0, "12:30": 0, "13:30": 0, "14:30": 0, "15:30": 0, "16:30": 0 }
		};
	}
}
