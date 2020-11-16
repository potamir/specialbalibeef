import React, { Component } from "react";
import ComingSoon from "../../layouts/ComingSoon";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async login() {
        await fetch(`https://45.15.24.190:1110/admin_login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.isLogin) {
                    await localStorage.setItem("isLogin", responseJson.isLogin);
                    await localStorage.setItem("username", responseJson.username);
                    await localStorage.setItem("privilege", responseJson.privilege);
                    // this.props.history.push({
                    //     pathname: "/Data",
                    //     state: { status: responseJson.status },
                    // });
                    console.log(responseJson, "SUCCESS")
                } else {
                    console.log("fail login");
                    // await this.setState({
                    //     modaltrigger: true,
                    //     modalstatus: "ID and Password invalid",
                    // });
                }
                console.log(responseJson);
            });
    }

    async handleChange(status, value) {
        await this.setState({ [status]: value });
    }

    render() {
        return (
            <>
                <div className="LoginContainer">
                    <h1>LOGIN</h1>
                    <div className="LoginUsername">
                        <label style={{ marginRight: "1em" }} ><b>USERNAME</b></label>
                        <input id="uname" type="text" value={this.state.username} onChange={(e) => this.handleChange("username", e.target.value)}></input>
                    </div>
                    <div className="LoginPassword">
                        <label style={{ marginRight: "1em" }} ><b>PASSWORD</b></label>
                        <input id="pass" type="password" value={this.state.password} onChange={(e) => this.handleChange("password", e.target.value)}></input>
                    </div>
                    <button onClick={this.login}>LOGIN</button>
                </div>
            </>
        );
    }
}

export default Admin;