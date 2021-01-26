import React, {Component, Fragment} from "react";
import 'bulma/css/bulma.css'
import ManagementService from "../../services/ManagementService";
import SearchTermsService from "../../services/SearchTermsService";

class ArticleFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            currentPage: props.data.page,
        };
        this.totalPages = Math.ceil(props.data.total / props.data.size);
    }

    handleChange = (event) => {
        this.setState({filter: event.target.value});
    }

    handleFilter = async (event) => {
        await this.props.retrieveArticles(0, this.state.filter);
    }

    handleClickPrevious = async (event) => {
        await this.props.retrieveArticles(this.state.currentPage - 1, this.state.filter);
        this.setState({currentPage: this.state.currentPage - 1});
    }

    handleClickNext = async (event) => {
        await this.props.retrieveArticles(this.state.currentPage + 1, this.state.filter);
        this.setState({currentPage: this.state.currentPage + 1});
    }

    renderPreviousLink = () => {
        const currentPage = this.state.currentPage;
        if(currentPage <= 0) {
            return null;
        }
        return <p className="level-item" onClick={this.handleClickPrevious}><a>Previa</a></p>
    }

    renderNextLink = () => {
        const currentPage = this.state.currentPage;
        if(currentPage === this.totalPages - 1) {
            return null;
        }
        return <p className="level-item" onClick={this.handleClickNext}><a>Siguente</a></p>
    }

    renderFilterForm = () => {
        return (
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <p className="subtitle is-5">
                            <strong>{this.props.data.total}</strong> artículos
                        </p>
                    </div>
                    <div className="level-item">
                        <div className="field has-addons">
                            <p className="control">
                                <input className="input" type="text" placeholder="Filtrar" onChange={this.handleChange} />
                            </p>
                            <p className="control">
                                <button className="button" onClick={this.handleFilter}>
                                    Filtrar
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="level-right">
                    <p className="level-item">
                        Página {this.state.currentPage + 1} de {Math.ceil(this.props.data.total / this.props.data.size)}.
                    </p>
                    {this.renderPreviousLink()}
                    {this.renderNextLink()}
                </div>
            </nav>
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
