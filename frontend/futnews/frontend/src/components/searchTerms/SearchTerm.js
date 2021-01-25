import React, {Component} from "react";
import 'bulma/css/bulma.css'
import SearchTermsService from "../../services/SearchTermsService";

class SearchTerm extends Component {

   constructor(props) {
        super(props);
        this.searchTermsService = new SearchTermsService();
    }

    handleDeleteTerm = async (event) => {
        // delete term using the API
        await this.searchTermsService.deleteRow(this.props.data.id);
        await this.props.retrieveSearchTerms();
    }

    render() {
        if (!this.props.data) {
            return null;
        }
        //TODO: add delete
        return (
            <div className="control">
                <div className="tags has-addons">
                    <span className="tag is-danger">{this.props.data.term}</span>
                    <a className="tag is-delete" onClick={this.handleDeleteTerm}> </a>
                </div>
            </div>
        )
    }
}

export default SearchTerm;
