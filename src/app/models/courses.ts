export class Course {
	code: string;
	name: string;
	semesterYear: string;
	credit: number;
	type: string;
	department: string;
	studentCount: number;
	manipulatedCapacity: number;
	instructor: string;
	hoursPreference: string; //[3] ,[2,1]
	serveHours: number;
	calcHour: number[];

	constructor(
		code: string,
		name: string,
		semesterYear: string,
		credit: number,
		type: string,
		department: string,
		studentCount: number,
		instructor: string,
		hoursPreference: string
	) {
		this.code = code;
		this.name = name;
		this.semesterYear = semesterYear;
		this.credit = credit;
		this.type = type;
		this.department = department;
		this.studentCount = studentCount;
		this.manipulatedCapacity = studentCount;
		this.instructor = instructor;
		this.hoursPreference = hoursPreference;
		this.serveHours = 0;
		this.calcHour = [];

		if (this.hoursPreference === "A") {
			this.calcHour.push(3);
		} else {
			this.calcHour.push(2);
			this.calcHour.push(1);
		}
	}

	resetCourse() {
		this.manipulatedCapacity = this.studentCount;
		this.serveHours = 0;
	}

	incServeHour() {
		this.serveHours += 1;
	}

	isCourseHourFull() {
		return this.serveHours === 3;
	}

	setEmpty() {
		this.serveHours = 0;
	}

	toString() {
		return this.code;
	}

	updateCourseHour() {
		this.calcHour = [];
		if (this.hoursPreference === "A") {
			this.calcHour.push(3);
		} else {
			this.calcHour.push(2);
			this.calcHour.push(1);
		}
	}
}
