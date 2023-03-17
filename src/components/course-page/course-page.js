import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

import './course-page.css';
import ApiService from "../../services/api-service";
import Spinner from "../spinner/spinner";

const CoursePage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState(null);
    const [loading, setLoading] = useState(true);
    const [curentLesson, setCurrentLesson] = useState(null);
    const apiService = new ApiService();


    useEffect(() => {
        apiService
            .getCourse(id)
            .then((course) => {
                setCourse(course);
                const sortedLessons = [...course.lessons].sort((a, b) => a.order - b.order);
                setLessons(sortedLessons);
                setCurrentLesson(sortedLessons.find((lesson) => lesson.status == "unlocked").order)
                setLoading(false);
            });
    }, [id]);

    const renderItems = (arr) => {
        return arr.map(({ id, title, order, status }) => {
            const classStatus = status == 'locked' ? 'locked' : '';
            const classActive = order == curentLesson ? 'active' : '';

            return (
                <li
                    key={id}
                    className={classStatus + ' ' + classActive}
                    onClick={() => status == "unlocked" ? setCurrentLesson(order) : ''}>
                    {title}
                </li>
            )
        });
    }

    const renderVideo = () => {
        const url = lessons[curentLesson - 1].link;
        const status = lessons[curentLesson - 1].status;
        if (url && status == "unlocked")
            return (
                <ReactPlayer
                    controls={true}
                    playing={true}
                    className="course-page-video"
                    url={url}
                    width='100%'
                    height='auto'
                />
            );
        else if(status == "locked")
            return (<img src="images/video-locked.jpg" alt="Video locked" className='react-player-not-found' />);
        else 
            return (<img src="images/video-not-found.jpg" alt="Not found" className='react-player-not-found' />);
    }

    if (loading) {
        return (<div className="course-page-spinner"><Spinner /></div>);
    }

    return (
        <section className="course-page" key={course.id}>
            <div className="container">

                <h2 className="section-title" >{course.title}</h2>

                <div className="course-page-inner">
                    <div className="react-player-wrapper">
                        {renderVideo()}
                    </div>
                    <p className="course-page-text">
                        {course.description}
                    </p>
                </div>

                <div className="course-page-info">
                    <ul className="course-page-text course-page-lessons">
                        {renderItems(lessons)}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default CoursePage;