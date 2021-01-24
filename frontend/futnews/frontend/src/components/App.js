import React, {Component, Fragment} from "react";
import Menu from "./Menu";
import ConfigPage from "./ConfigPage";
import ArticlesService from "../services/ArticlesService";
import SearchTermsService from "../services/SearchTermsService";
import ArticlesPage from "./ArticlesPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: "articles",
        }
        this.articlesService = new ArticlesService();
        this.searchTermsService = new SearchTermsService();
    }

    onMenuClick = (menuName) => {
        this.setState({selectedMenu: menuName});
    }

    renderPageContents = () => {
        return (
            <Fragment>
                {(this.state.selectedMenu === "articles" && <ArticlesPage />)}
                {(this.state.selectedMenu === "config" && <ConfigPage />)}
            </Fragment>
        );
    }

    render() {
        return (
            <div className="container is-fluid">
                <Menu changeMenu={this.onMenuClick}/>
                {this.renderPageContents()}
            </div>
        )
    }
}

export default App;
