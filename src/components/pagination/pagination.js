import React from "react";
import "./pagination.css";

const Pagination = ({ coursesPerPage, totalCourses, paginate, onClickNext, onClickPrev }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            <button className="btn pagination-btn prev" onClick={onClickPrev}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            {
                pageNumbers.map(number => (
                    <li className="pagination-number" key={number} data-number={number}>
                        <span onClick={() => paginate(number)}>{number}</span>
                    </li>
                ))
            }
            <button className="btn pagination-btn next" onClick={() => onClickNext()}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </ul>
    );
}

export default Pagination;