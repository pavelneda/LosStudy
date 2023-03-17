import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './app.css';


import Header from "../header/header";
import Footer from "../footer/footer";
import About from "../about/about";
import Courses from "../courses/courses";
import CoursePage from "../course-page/course-page";

import PersonDetails from "../person-details/person-details";
import ItemList from "../item-list/item-list";
import RandomPlanet from "../random-planet/random-planet";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";


export default class App extends Component {

   state = {
      hasError: false
   };

   componentDidCatch() {
      this.setState({ hasError: true });
   }

   render() {

      if (this.state.hasError) {
         return <ErrorIndicator />;
      }

      return (
         <div id="root-inner">
            <Header />
            <Routes>
               <Route path="/" element={
                  <>
                     <Courses />
                     <About />
                  </>
               } />
               <Route path="/:id" element={<CoursePage />} />
            </Routes>
            <Footer />
         </div>
      );
   }
};

