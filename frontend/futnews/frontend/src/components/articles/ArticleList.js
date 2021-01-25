import React, {Component} from "react";
import 'bulma/css/bulma.css'
import Article from "./Article";
import ArticleFilter from "./ArticleFilter";

class ArticleList extends Component {

    renderArticles = () => {
        return this.props.data.items.map(article =>
            <Article key={article.id} data={article} />
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
                <ArticleFilter retrieveArticles={this.props.retrieveArticles} data={this.props.data} />
                {this.renderArticles()}
            </section>
        )
    }
}

export default ArticleList;
