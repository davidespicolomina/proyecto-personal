import React, {Component} from "react";
import 'bulma/css/bulma.css'
import ManagementService from "../../services/ManagementService";

class Update extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNotification: false,
        }
        this.managementService = new ManagementService();
    }

    handleUpdate = async (event) => {
        // launch update terms, reading from the news webs
        await this.managementService.post({});
        this.toggleShowNotification();
    }

    toggleShowNotification = () => {
        this.setState({showNotification: !this.state.showNotification});
    }

    renderNotification = () => {
        if (!this.state.showNotification) {
            return null;
        }
        return (
            <div className="field">
                <div className="notification is-success">
                    <button className="delete" onClick={this.toggleShowNotification}> </button>
                    Proceso lanzado!
                </div>
            </div>
        );
    }

    renderUpdateButton = () => {
        return (
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" onClick={this.handleUpdate}>
                                Lanzar actualización
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <section className="section">
                <h1 className="title is-3">Leer nuevas noticias</h1>
                {this.renderUpdateButton()}
                {this.renderNotification()}
            </section>
        );
    }
}

export default Update;
