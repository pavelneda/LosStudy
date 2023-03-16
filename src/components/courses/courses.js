import React, { Component } from "react";
import ApiService from "../../services/api-service";
import Pagination from "../pagination/pagination";
import Spinner from "../spinner/spinner";
import './courses.css';

function offset(el) {
    let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

export default class Courses extends Component {

    apiService = new ApiService();
    _coord = null;

    state = {
        courseList: null,
        loading: true,
        currentPage: 1,
        coursesPerPage: 10,
        coordPagination: 0
    };

    componentDidMount() {
        this.apiService
            .getAllCourses()
            .then((courseList) => {
                this.setState({
                    courseList,
                    loading: false
                });
            });
        console.log(this.props)
    }

    componentDidUpdate() {
        const pagination = document.querySelector('.pagination');
        const coordPagination = offset(pagination);

        document.querySelectorAll(".pagination-number").forEach(item => {
            if (item.classList.contains("active"))
                item.classList.remove("active")
        });
        document.querySelector(`.pagination-number[data-number="${this.state.currentPage}"]`)
            .classList.add("active");

        if (this._coord) {
            window.scrollBy(0, coordPagination.top - this._coord.top);
        }

        this._coord = coordPagination;
    }

    paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
    nextPage = () => this.setState((state) => {
        if (state.currentPage != Math.ceil(state.courseList.length / state.coursesPerPage))
            return { currentPage: state.currentPage + 1 }
    });
    prevPage = () => this.setState((state) => {
        if (state.currentPage != 1)
            return { currentPage: state.currentPage - 1 }
    });
    

    renderItems(arr) {
        return arr.map(({ id, title, img, lessonsCount, rating, skills }) => {

            if (skills) {
                skills = skills.map((skill) => (
                    <li key={id + skill}>{skill}</li>
                ))
            }

            return (
                <div className="courses-item" key={id}>
                    <div className="courses-item-img">
                        <img src={img} alt={title} />
                    </div>
                    <div className="courses-info">
                        <h3 className="courses-name">{title}</h3>
                        <ul className="courses-skills">{skills}</ul>
                        <span className="courses-data"><i className="fa-regular fa-clock"></i>Number of lessons: {lessonsCount}</span>
                        <span className="courses-data"><i className="fa-regular fa-star"></i>Rating: {rating}</span>
                        <a href="tel:+380982284569" className="btn courses-btn">
                            View this course
                        </a>
                    </div>
                </div>
            );
        });
    }

    render() {

        const { courseList, loading, coursesPerPage, currentPage } = this.state;
        if (loading) {
            return (<div className="courses-spinner"><Spinner /></div>);
        }

        const lastCourseIndex = currentPage * coursesPerPage;
        const firstCourseIndex = lastCourseIndex - coursesPerPage;
        const currentCourses = courseList.slice(firstCourseIndex, lastCourseIndex)

        const items = this.renderItems(currentCourses);

        return (
            <section className="courses">
                <div className="container">
                    <h2 className="intro-right-title courses-title" >Our courses</h2>

                    <div className="courses-list">
                        {items}
                    </div>

                    <Pagination
                        coursesPerPage={coursesPerPage}
                        totalCourses={courseList.length}
                        paginate={this.paginate}
                        onClickNext={this.nextPage}
                        onClickPrev={this.prevPage}
                    />
                </div>
            </section>
        );
    }
}