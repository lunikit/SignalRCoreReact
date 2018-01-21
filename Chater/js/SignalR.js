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


    componentDidMount() {

    }

    onPress = () => {
        console.warn('Test', signalR);

        let hubUrl = 'http://localhost:60164/chat';
        let httpConnection = new signalR.HttpConnection(hubUrl);
        let hubConnection = new signalR.HubConnection(httpConnection);

        hubConnection.on("Send", data => {
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

        hubConnection.start();
    }

    render() {
        return (
            <View >
                <TouchableOpacity onPress={this.onPress}>
                    <Text>SignalR Chater</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
