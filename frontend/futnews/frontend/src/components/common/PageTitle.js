import React, {Component} from "react";
import 'bulma/css/bulma.css'

class PageTitle extends Component {
    render() {
        return (
            <section className="hero is-info is-light is-bold is-small">
                <div className="hero-body">
                    <div className="container is-fluid">
                        <h1 className="title is-2">
                            {this.props.title}
                        </h1>
                    </div>
                </div>
            </section>
        )
    }
}

export default PageTitle;
