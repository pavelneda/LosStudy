import React, { Component } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';

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

function withParamsAndNavigate(Component) {
    return props => <Component {...props} params={useParams()} />;
}

const withNavigateHook = (Component) => {
    return (props) => {
        const navigation = useNavigate();
        return <Component navigation={navigation} {...props} />
    }
}

class Courses extends Component {

    apiService = new ApiService();
    _coord = null;

    state = {
        currentPage: 1,
        coursesPerPage: 10,
        coordPagination: 0
    };

    componentDidMount() {
        let page = null;
        if (!!this.props.params.page && Number.isInteger(parseInt(this.props.params.page)))
            page = this.props.params.page;
        if (!this.props.courseList)
            this.apiService
                .getAllCourses()
                .then((courseList) => {
                    this.props.onCoursesLoaded(courseList);
                    if (page)
                        this.setState({ currentPage: page })
                });
        else {
            if (page)
                this.setState({ currentPage: page })
            else
                this.updatePagination();
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (!!document.location.pathname.slice(1) && this.state.currentPage != document.location.pathname.slice(1)) {
            this.setState({
                currentPage: document.location.pathname.slice(1)
            })
        }
        this.updatePagination();
    }

    updatePagination = () => {
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

    paginate = (pageNumber) => {
        this.props.navigation(`/${pageNumber}`);
        this.setState({ currentPage: pageNumber });
    }
    nextPage = () => this.setState((state) => {
        if (state.currentPage != Math.ceil(this.props.courseList.length / state.coursesPerPage)) {
            this.props.navigation(`/${parseInt(state.currentPage) + 1}`);
            return { currentPage: parseInt(state.currentPage) + 1 }
        }
    });

    prevPage = () => this.setState((state) => {
        if (state.currentPage != 1) {
            this.props.navigation(`/${parseInt(state.currentPage) - 1}`);
            return { currentPage: parseInt(state.currentPage) - 1 }
        }
    });

    renderItems(arr) {
        return arr.map(({ id, title, img, lessonsCount, rating, skills, courseVideoPreview }) => {

            if (skills) {
                skills = skills.map((skill) => (
                    <li key={id + skill}>{skill}</li>
                ))
            }

            return (
                <div className="courses-item" key={id}>
                    <div className="courses-item-img">
                        <img src={img} alt={title} />
                        {courseVideoPreview && <div className="courses-item-video-wrapper">
                            <ReactPlayer
                                loop={true}
                                playing={true}
                                muted={true}
                                className="courses-item-video"
                                url={courseVideoPreview}
                                width='100%'
                                height='auto'
                            />
                        </div>}
                    </div>
                    <div className="courses-info">
                        <h3 className="courses-name">{title}</h3>
                        <ul className="courses-skills">{skills}</ul>
                        <span className="courses-data"><i className="fa-regular fa-clock"></i>Number of lessons: {lessonsCount}</span>
                        <span className="courses-data"><i className="fa-regular fa-star"></i>Rating: {rating}</span>
                        <Link to={`/course/${id}`} className="btn courses-btn">
                            View this course
                        </Link>
                    </div>
                </div>
            );
        });
    }

    render() {

        const { coursesPerPage, currentPage } = this.state;
        const { isLoading, courseList } = this.props
        if (isLoading) {
            return (<div className="courses-spinner"><Spinner /></div>);
        }

        const lastCourseIndex = currentPage * coursesPerPage;
        const firstCourseIndex = lastCourseIndex - coursesPerPage;
        const currentCourses = courseList.slice(firstCourseIndex, lastCourseIndex)
        const items = this.renderItems(currentCourses);

        return (
            <section className="courses">
                <div className="container">
                    <h2 className="section-title courses-title" >Our courses</h2>

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

export default withParamsAndNavigate(withNavigateHook(Courses));