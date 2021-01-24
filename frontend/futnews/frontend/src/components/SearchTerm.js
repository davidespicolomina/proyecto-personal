import React, {Component} from "react";
import 'bulma/css/bulma.css'

class SearchTerm extends Component {
    render() {
        if (!this.props.data) {
            return null;
        }
        //TODO: add delete
        return (
            <div className="control">
                <div className="tags has-addons">
                    <span className="tag is-danger">{this.props.data.term}</span>
                    <a className="tag is-delete"> </a>
                </div>
            </div>
        )
    }
}

export default SearchTerm;
