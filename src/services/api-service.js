export default class ApiService {

    _apiBase = 'https://api.wisey.app/api/v1';

    async getResource(url, requestOptions = { method: 'GET', redirect: 'follow' }) {
        // Make request
        const res = await fetch(`${this._apiBase}${url}`, requestOptions);

        // Check if response is valid
        if (!res.ok) {
            throw new Error(`Received ${res.status}`)
        }

        // Parse response as JSON and return
        return await res.json();
    }

    async _getToken() {
        const token = await this.getResource(`/auth/anonymous?platform=subscriptions`);
        return token.token;
    }

    // Fetches all courses
    async getAllCourses() {
        // Initialize the headers object with an authorization token
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${await this._getToken()}`);
        let requestOptions = {
            headers: myHeaders,
        };

        // Call the getResource method with the appropriate endpoint and options
        const res = await this.getResource(`/core/preview-courses`, requestOptions)
        // Map the returned array of courses to transformed course objects and return the result
        return res.courses.map(this._transformCourseForList);
    }

    // Fetches a specific course by ID
    async getCourse(id) {
        // Initialize the headers object with an authorization token
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${await this._getToken()}`);
        let requestOptions = {
            headers: myHeaders,
        };

        // Call the getResource method with the appropriate endpoint and options
        const course = await this.getResource(`/core/preview-courses/${id}`, requestOptions);
        // Transform the returned course object and return the result
        return this._transformCourse(course);
    }

    _transformCourseForList = (course) => {
        const { id, title, previewImageLink, meta: { courseVideoPreview, skills, lessonsCount, rating } } = course
        return {
            id,
            title,
            img: `${previewImageLink}/cover.webp`,
            courseVideoPreview: courseVideoPreview && courseVideoPreview.link,
            lessonsCount,
            rating,
            skills
        }
    }

    _transformCourse = (course) => {
        return {
            id: course.id,
            title: course.title,
            description: course.description,
            lessons: course.lessons.map(this._transformLesson)
        }
    }

    _transformLesson = ({ id, title, order, status, link }) => {
        return {
            id,
            title,
            order,
            status,
            link,
        }
    }
}