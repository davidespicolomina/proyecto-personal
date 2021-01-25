import React, {Component, Fragment} from "react";
import 'bulma/css/bulma.css'
import PageTitle from "./common/PageTitle";
import ArticlesService from "../services/ArticlesService";
import ArticleList from "./articles/ArticleList";

class ArticlesPage extends Component {
    constructor(props) {
        super(props);
        this.articlesService = new ArticlesService();
        this.state = {
            articles: null,
        }
    }

    async componentDidMount() {
        await this.retrieveArticles(null);
    }

    retrieveArticles = async (filter) => {
        const articles = await this.articlesService.getAllFiltered(filter);
        console.log("filter", filter);
        console.log(articles);
        this.setState({ articles });
    }


    render() {
        return (
            <Fragment>
                <PageTitle title={"Artículos"} />
                <ArticleList data={this.state.articles} retrieveArticles={this.retrieveArticles} />
            </Fragment>
        )
    }
}

export default ArticlesPage;
