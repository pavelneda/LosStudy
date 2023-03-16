export default class ApiService {

    _apiBase = 'https://api.wisey.app/api/v1';

    async getResource(url, requestOptions = { method: 'GET', redirect: 'follow' }) {
        const res = await fetch(`${this._apiBase}${url}`, requestOptions);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return await res.json();
    }

    async _getToken() {
        const token = await this.getResource(`/auth/anonymous?platform=subscriptions`);
        return token.token;
    }

    async getAllCourses() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${await this._getToken()}`);
        let requestOptions = {
            headers: myHeaders,
        };

        const res = await this.getResource(`/core/preview-courses`, requestOptions)
        return res.courses.map(this._transformCourse);
    }

    async getCourse(id) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${await this._getToken()}`);
        let requestOptions = {
            headers: myHeaders,
        };

        const course = await this.getResource(`/core/preview-courses/${id}`, requestOptions);
        return this._transformCourse(course);
    }

    _transformCourse = (course) => {
        return {
            id: course.id,
            title: course.title,
            img: course.previewImageLink + '/cover.webp',
            lessonsCount: course.lessonsCount,
            rating: course.rating,
            skills: course.meta.skills
        }
    }
}