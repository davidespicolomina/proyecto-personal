import React, {Component, Fragment} from "react";
import 'bulma/css/bulma.css'
import SearchTerm from "./SearchTerm";
import AddSearchTermForm from "./AddSearchTermForm";

class SearchTermsList extends Component {

    renderSearchTerms = () => {
        return this.props.data.map(searchTerm =>
            <SearchTerm key={searchTerm.id} data={searchTerm} />
        );
    }

    handleChange = (event) => {
        let hasChanged = false;
        if (this.state.numericValue.toString() !== event.target.value) {
            hasChanged = true;
        }
        this.setState({numericValue: event.target.value, hasChanged: hasChanged});
    }


    render() {
        if (!this.props.data) {
            return null;
        }
        return (
            <section className="section">
                <h1 className="title is-3">Términos de búsqueda</h1>
                <div className="field is-grouped is-grouped-multiline">
                    {this.renderSearchTerms()}
                </div>
                <AddSearchTermForm retrieveSearchTerms={this.props.retrieveSearchTerms} />
            </section>
        )
    }
}

export default SearchTermsList;
