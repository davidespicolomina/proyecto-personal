import React, {Component, Fragment} from "react";
import 'bulma/css/bulma.css'
import SearchTerm from "./SearchTerm";

class SearchTermsList extends Component {

    renderSearchTerms = () => {
        return this.props.data.map(searchTerm =>
            <SearchTerm key={searchTerm.id} data={searchTerm} />
        );
    }

    render() {
        if (!this.props.searchTerms) {
            return null;
        }
        return (
            <Fragment>
                <h1 className="title is-2">Términos de búsqueda</h1>
                <div className="tags">
                    {this.renderSearchTerms()}
                </div>
            </Fragment>
        )
    }
}

export default SearchTermsList;
