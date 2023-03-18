import React from 'react';
import './lessons-list.css';


function LessonList({curentLesson, lessons, onLessonSelected}) {
    return (
        <>
        {
            lessons.map(({id, status, order, title}) => {
                const classStatus = status == 'locked' ? 'locked' : '';
                const classActive = order == curentLesson ? 'active' : '';
                return (
                    <li
                        key={id}
                        className={classStatus + ' ' + classActive}
                        onClick={() => onLessonSelected(status, order)}>
                        {title}
                    </li>
                )
            })
        }
        </>
    )
}

export default LessonList;
