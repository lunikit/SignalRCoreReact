import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

const signalR = require('./signalr-client-1.0.0-alpha2-final.min.js');

export default class SignalR extends Component<{}> {


    constructor(props) {
        super(props);

        this.state = { error: false };
    }

    componentDidMount() {
        this.onPress();
    }

    onPress = () => {
        let hubUrl = 'http://192.168.13.198:60164/chat';
        let httpConnection = new signalR.HttpConnection(hubUrl);
        this.hubConnection = new signalR.HubConnection(httpConnection);

        this.hubConnection.on("Send", data => {
            console.warn('message', data);
        });

        /*
        document.getElementById("sendBtn").addEventListener("click", function (e) {
            let message = document.getElementById("message").value;
            hubConnection.invoke("Send", message);
        });

        document.getElementById("sendBtnApi").addEventListener("click", function (e) {
            let message = document.getElementById("message").value;
            fetch('/api/chat/' + message, { method: 'POST' });
        });
        */

        this.hubConnection.start()
            .then(() => this.setState({ error: false }))
            .catch(error => {
                this.setState({ error: true })
                console.warn('error', error);
            });
    }

    onSend = () => {
        this.hubConnection.invoke('Send', 'Test');
    }

    render() {
        return (
            <View >
                { this.state.error && <Text>Error</Text> }

                <TouchableOpacity onPress={ this.onSend }>
                    <View >
                        <Text>__________________________________Send</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
