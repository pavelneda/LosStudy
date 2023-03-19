import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Cookies from 'js-cookie';
import { useBeforeunload } from 'react-beforeunload';

import './course-page.css';
import ApiService from "../../services/api-service";
import Spinner from "../spinner/spinner";
import LessonList from '../lessons-list/lessons-list';
import ErrorIndicator from '../error-indicator/error-indicator';

const CoursePage = () => {
    const { id } = useParams();
    const [hasError, setHasError] = useState(false);
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [curentLesson, setCurrentLesson] = useState(null);
    const [curentTimeVideo, setCurentTimeVideo] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1)
    const apiService = new ApiService();
    const playerRef = useRef();
    const currentDataRef = useRef();

    useEffect(() => {
        apiService
            .getCourse(id)
            .then((course) => {
                setCourse(course);
                const sortedLessons = sortLessons(course.lessons);
                setLessons(sortedLessons);
                const [lastLesson, lastTimeVideo] = loadCookies(sortedLessons);
                setCurrentLesson(lastLesson)
                setCurentTimeVideo(lastTimeVideo)
            })
            .catch((error) => {
                setHasError(error);})
            .finally(() => setLoading(false))

    }, [id]);
    

    useEffect(() => {
        currentDataRef.current = { curentLesson, curentTimeVideo };
    }, [curentTimeVideo, curentTimeVideo]);

    useEffect(() => {
        // add event listener
        document.addEventListener('keydown', keyListener, true)
        return () => {
            // remove event listener
            document.removeEventListener('keydown', keyListener, true)
            // set cookies
            setCookies(currentDataRef.current.curentLesson, currentDataRef.current.curentTimeVideo);
        }
    }, [])

    useBeforeunload(() => setCookies(curentLesson, curentTimeVideo));

    const sortLessons = (lessons) => {
        return [...lessons].sort((a, b) => a.order - b.order);
    };    

    const onReady = useCallback(() => {
        if (!isLoading && currentDataRef.current) {
            playerRef.current.seekTo(currentDataRef.current.curentTimeVideo, "seconds");
        }
    }, [isLoading]);

    const onLessonSelected = (status, order) => {
        if (status == "unlocked") {
            setCurrentLesson(order);
            setCurentTimeVideo(0);
        }
    }

    const loadCookies = (lessons) => {
        let cookies = {};
        try {
            cookies = JSON.parse(Cookies.get(id))
        } catch {
            cookies.lastLesson = 'not found'
        }

        if (!Number.isInteger(parseInt(cookies.lastLesson)))
            return [lessons.find((lesson) => lesson.status == "unlocked").order, 0];

        return [cookies.lastLesson, cookies.lastTimeVideo];
    }

    const setCookies = (lastLesson, lastTimeVideo) => {
        if (lastLesson !== '') {
            Cookies.set(id, JSON.stringify({
                lastLesson: lastLesson,
                lastTimeVideo: lastTimeVideo
            }), { expires: 365 });
        }
    }

    const keyListener = (e) => {
        if (e.ctrlKey && e.keyCode == '39') {
            setPlaybackRate((playbackRate) => playbackRate + 0.3)
        } else if (e.ctrlKey && e.keyCode == '37') {
            setPlaybackRate((playbackRate) => playbackRate - 0.3)
        }
    }

    const renderVideo = () => {
        const url = lessons[curentLesson - 1].link;
        const status = lessons[curentLesson - 1].status;
        if (url && status == "unlocked")
            return (
                <ReactPlayer
                    ref={playerRef}
                    progressInterval={1000}
                    controls={true}
                    playing={true}
                    className="course-page-video"
                    url={url}
                    playbackRate={playbackRate}
                    width='100%'
                    height='auto'
                    onReady={onReady}
                    onProgress={({ playedSeconds }) => setCurentTimeVideo(playedSeconds)}
                />
            );
        return (
            <img
                src={
                    status === "locked" ? "/images/video-locked.jpg" : "/images/video-not-found.jpg"
                }
                alt={status === "locked" ? "Video locked" : "Not found"}
                className="react-player-not-found"
            />
        );
    }


    if (isLoading) {
        return (<div className="course-page-spinner"><Spinner /></div>);
    }

    if (hasError) {
        return (<ErrorIndicator error={hasError} />);
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
                    <p className="course-page-instruction">
                        To change the video speed, press CTRL+right/left arrow
                    </p>
                    <ul className="course-page-text course-page-lessons">
                        <LessonList
                            curentLesson={curentLesson}
                            lessons={lessons}
                            onLessonSelected={onLessonSelected} />
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default CoursePage;

