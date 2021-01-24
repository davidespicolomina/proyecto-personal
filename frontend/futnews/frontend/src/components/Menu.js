import React, {Component} from "react";
import 'bulma/css/bulma.css'

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    onClickArticlesMenu = () => {
        this.props.changeMenu("articles");
    }

    onClickConfigMenu = () => {
        this.props.changeMenu("config");
    }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img alt="" src="/static/frontend/logo.png" width="112" height="28" />
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                       data-target="mainNavbar">
                        <span aria-hidden="true"> </span>
                        <span aria-hidden="true"> </span>
                        <span aria-hidden="true"> </span>
                    </a>
                </div>

                <div id="mainNavbar" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" onClick={this.onClickArticlesMenu}>
                            Artículos
                        </a>
                        <a className="navbar-item" onClick={this.onClickConfigMenu}>
                            Configuración
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Menu;
