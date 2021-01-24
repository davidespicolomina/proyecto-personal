import React, {Component, Fragment} from "react";
import 'bulma/css/bulma.css'
import PageTitle from "./common/PageTitle";
import SearchTermsService from "../services/SearchTermsService";
import SearchTermList from "./SearchTermList";

class ConfigPage extends Component {
    constructor(props) {
        super(props);
        this.searchTermsService = new SearchTermsService();
        this.state = {
            searchTerms: null,
        }
    }

    async componentDidMount() {
        await this.retrieveSearchTerms();
    }

    retrieveSearchTerms = async () => {
        const searchTerms = await this.searchTermsService.getAll();
        console.log(searchTerms);
        this.setState({ searchTerms });
    }

    render() {
        if (!this.state.searchTerms) {
            return null;
        }
        return (
            <Fragment>
                <PageTitle title={"Configuración"} />
                <SearchTermList data={this.state.searchTerms} retrieveSearchTerms={this.retrieveSearchTerms}/>
            </Fragment>
        )
    }
}

export default ConfigPage;
