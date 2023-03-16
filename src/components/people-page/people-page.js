import React, { Component } from "react";
import ErrorIndicator from "../error-indicator/error-indicator";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";

export default class PeoplePage extends Component {

    state = {
        selectedPerson: 3,
        hasError: false
    };

    componentDidCatch(){
        this.setState({hasError: true});
     }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {

        if(this.state.hasError){
            return <ErrorIndicator />;
         }

        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onItemSelected={this.onPersonSelected} />
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson} />
                </div>
            </div>
        );
    }
}