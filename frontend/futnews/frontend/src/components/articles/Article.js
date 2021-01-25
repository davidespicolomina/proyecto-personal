import React, {Component} from "react";
import 'bulma/css/bulma.css'
import SearchTermsService from "../../services/SearchTermsService";
import Truncate from "react-truncate";

class Article extends Component {

   constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            truncated: false
        };
        this.searchTermsService = new SearchTermsService();
    }

    processText = (text) => {
       const words = text.split(' ').length;
       return text.replaceAll("\n", "<br />");
    }

    handleTruncate = (truncated) => {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }

    toggleLines = (event) => {
        event.preventDefault();
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        if (!this.props.data) {
            return null;
        }
        const article = this.props.data;
        //<span dangerouslySetInnerHTML={{__html: this.processText(article.summary)}}/>
        const {expanded, truncated} = this.state;
        const lines = 3;
        return (
            <article className="media">
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{article.title}</strong> <small>{article.source}</small>
                            <br />
                            <Truncate
                                lines={!expanded && lines}
                                ellipsis={(
                                    <span>... <a href='#' onClick={this.toggleLines}>Más</a></span>
                                )}
                                onTruncate={this.handleTruncate}
                            >
                                {article.summary}
                            </Truncate>
                            {!truncated && expanded && (
                                <span> <a href='#' onClick={this.toggleLines}>Menos</a></span>
                            )}
                            <br />
                            <small>{article.last_updated}</small>
                        </p>
                    </div>
                    <nav className="level is-mobile">
                        <div className="level-left">
                            <a className="level-item" href={article.url}>Ver en {article.source}</a>
                        </div>
                    </nav>
                </div>
            </article>
        )
    }
}

export default Article;
