import React, {Component} from "react";
import 'bulma/css/bulma.css'
import PageTitle from "./common/PageTitle";

class ArticlesPage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <PageTitle title={"Artículos"} />
        )
    }
}

export default ArticlesPage;
