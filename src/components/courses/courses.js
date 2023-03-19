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

const withNavigateAndParams = (Component) => {
    return (props) => {
        const navigation = useNavigate();
        const params = useParams();
        // Return the wrapped component with the navigation, params, and original props spread as additional props
        return <Component params={params} navigation={navigation} {...props} />
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
        // Destructure the values passed down through props.
        const { params, courseList, onCoursesLoaded } = this.props;
        let page = null;

        // Check if the params page is a number and an integer.
        if (!!params.page && Number.isInteger(parseInt(params.page))) {
            page = params.page;
        }

        // If there is no course list data available, make an API call to fetch it.
        if (!courseList)
            this.apiService.getAllCourses()
                .then((response) => onCoursesLoaded(response))
                .then(() => { 
                    // If a page number was provided, update the component state to reflect the current page.
                    if (page) {
                        this.setState({ currentPage: page });
                    }
                });
        else {
            if (page) this.setState({ currentPage: page })
            else this.updatePagination();
        }
    }

    componentDidUpdate() {
        if (!!document.location.pathname.slice(1) && this.state.currentPage != document.location.pathname.slice(1)) {
            this.setState({
                currentPage: document.location.pathname.slice(1)
            })
        }
        this.updatePagination();
    }

    updatePagination = () => {
        // Select the pagination element and calculate its coordinates
        const pagination = document.querySelector('.pagination');
        const coordPagination = offset(pagination);

        // Remove the 'active' class from the previously active page number
        const activePage = document.querySelector(".pagination-number.active");
        activePage && activePage.classList.remove("active");

        // Add the 'active' class to the current page number
        const currentPage = document.querySelector(`.pagination-number[data-number="${this.state.currentPage}"]`);
        currentPage && currentPage.classList.add("active");

        if (this._coord) {
            window.scrollBy(0, coordPagination.top - this._coord.top);
        }

        // Set the current coordinates to the updated pagination element's coordinates
        this._coord = coordPagination;
    }

    paginate = (pageNumber) => {
        this.props.navigation(`/${pageNumber}`);
        this.setState({ currentPage: pageNumber });
    }

    nextPage = () => this.setState((state) => {
        // Check if the currentPage does not equal the last page
        if (state.currentPage != Math.ceil(this.props.courseList.length / state.coursesPerPage)) {
            // Navigation to the next page using the navigation prop
            this.props.navigation(`/${parseInt(state.currentPage) + 1}`);
            // Return the updated state with the new currentPage value
            return { currentPage: parseInt(state.currentPage) + 1 }
        }
    });

    prevPage = () => this.setState((state) => {
        // Check if the currentPage does not equal the first page
        if (state.currentPage != 1) {
            // Navigation to the previous page using the navigation prop
            this.props.navigation(`/${parseInt(state.currentPage) - 1}`);
            // Return the updated state with the new currentPage value
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

export default withNavigateAndParams(Courses);