import { Classroom } from './classroom';
import { Course } from './courses';

export class Schedule {

	rooms: Classroom[] = []

	defaultScheduleFormat: ScheduleFormat = new ScheduleFormat(new Classroom("", 0), new Course("", "", "", 0, "", "", 0, "", ""))

	firstYear: ScheduleFormat[] = []
	secondYear: ScheduleFormat[] = []
	thirdYear: ScheduleFormat[] = []
	fourthYear: ScheduleFormat[] = []



	schedule_table: { [day: string]: { [time: string]: ScheduleFormat[] } } = {
		"Monday": { "8:30": [], "9:30": [], "10:30": [], "11:30": [], "12:30": [], "13:30": [], "14:30": [], "15:30": [], "16:30": [] },
		"Tuesday": { "8:30": [], "9:30": [], "10:30": [], "11:30": [], "12:30": [], "13:30": [], "14:30": [], "15:30": [], "16:30": [] },
		"Wednesday": { "8:30": [], "9:30": [], "10:30": [], "11:30": [], "12:30": [], "13:30": [], "14:30": [], "15:30": [], "16:30": [] },
		"Thursday": { "8:30": [], "9:30": [], "10:30": [], "11:30": [], "12:30": [], "13:30": [], "14:30": [], "15:30": [], "16:30": [] },
		"Friday": { "8:30": [], "9:30": [], "10:30": [], "11:30": [], "12:30": [], "13:30": [], "14:30": [], "15:30": [], "16:30": [] }
	};




	constructor(room: Classroom[]) {
		this.rooms = room;
	}


	createArrays() {
		for (let i = 0; i < 40; i++) {
			this.firstYear.push(this.defaultScheduleFormat)
			this.secondYear.push(this.defaultScheduleFormat)
			this.thirdYear.push(this.defaultScheduleFormat)
			this.fourthYear.push(this.defaultScheduleFormat)
		}



		const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
		const times = ["8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30"];


		let counter = 0;
		for (let day of days) {
			for (let time of times) {
				for (let i = 0; i < this.schedule_table[day][time].length; i++) {
					if (parseInt(this.schedule_table[day][time][i].course.semesterYear) == 1) {
						this.firstYear[counter] = this.schedule_table[day][time][i]
					}
					else if (parseInt(this.schedule_table[day][time][i].course.semesterYear) == 2) {
						this.secondYear[counter] = this.schedule_table[day][time][i]
					}
					else if (parseInt(this.schedule_table[day][time][i].course.semesterYear) == 3) {
						this.thirdYear[counter] = this.schedule_table[day][time][i]
					}
					else if (parseInt(this.schedule_table[day][time][i].course.semesterYear) == 4) {
						this.fourthYear[counter] = this.schedule_table[day][time][i]
					}
				}
				counter++
			}
			counter--;
		}
	}


}



export class ScheduleFormat {

	classroom: Classroom
	course: Course


	constructor(classroom: Classroom, course: Course) {
		this.classroom = classroom
		this.course = course
	}


}
