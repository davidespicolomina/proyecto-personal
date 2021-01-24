import React, {Component, Fragment} from "react";
import 'bulma/css/bulma.css'
import SearchTerm from "./SearchTerm";
import SearchTermsService from "../services/SearchTermsService";

class AddSearchTermForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: "",
            isLoading: false,
        };
        this.searchTermsService = new SearchTermsService();
    }

    handleChange = (event) => {
        this.setState({term: event.target.value});
    }

    handleAddTerm = async (event) => {
        // create new term using the API
        const dataToPost = {
            term: this.state.term,
        }
        this.setState({isLoading: true}, async () => {
            const result = await this.searchTermsService.post(dataToPost);
            await this.props.retrieveSearchTerms();
        });
    }

    render() {
        return (
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input className="input" type="text" placeholder="Nuevo término de búsqueda" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" onClick={this.handleAddTerm}>
                                    Añadir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSearchTermForm;
