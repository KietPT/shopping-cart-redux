import React, { Component } from 'react';


export default class Message extends Component {
    render() {
        let { message } = this.props;

        return (
            <div>
                <h3>
                    <span className="badge amber darken-2">
                        { message }
                    </span>
                </h3>
            </div>
        )
    }
}
    