import React, {Component, Fragment} from "react";
import 'bulma/css/bulma.css'
import ManagementService from "../../services/ManagementService";
import SearchTermsService from "../../services/SearchTermsService";

class ArticleFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: "",
        };
    }

    handleChange = (event) => {
        this.setState({filter: event.target.value});
    }

    handleFilter = async (event) => {
        await this.props.retrieveArticles(this.state.filter);
    }

    renderFilterForm = () => {
        return (
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control">
                            <input className="input" type="text" placeholder="Filtrar título o contenido" onChange={this.handleChange} />
                        </p>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" onClick={this.handleFilter}>
                                    Filtrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Fragment>
                {this.renderFilterForm()}
            </Fragment>
        );
    }
}

export default ArticleFilter;
