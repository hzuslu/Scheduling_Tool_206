export class Service {
	courseCode: string;
	day: string;
	timings: string[];

	constructor(courseCode: string, day: string, timings: string[]) {
		this.courseCode = courseCode;
		this.day = day;
		this.timings = timings;
	}
}
