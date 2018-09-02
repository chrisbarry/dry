import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {WebBrowser} from 'expo';

import {Button} from 'react-native';
import {ImagePicker} from 'expo';

import {MonoText} from '../components/StyledText';
import CommonDataManager from "../data/CommonDataManager";

export default class UploadScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        image: null,
    };

    onNavigatorEvent(event) {
        console.log("tab selected", event.id);
        if (event.id === 'willAppear') {
            // Load data now
        }
    }

    constructor(props) {
        super(props);
        let commonData = CommonDataManager.getInstance();
        //his.setState({image: commonData.imageFileUri});
        console.log(this);
        console.log(this.props);
        console.log(this.props.navigaton);
        //this.props.navigation.addListener(this.onNavigatorEvent);  //setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        //this.props.navigation.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        var that = this;
        this.props.navigation.addListener("didFocus", function () {
            console.log("here");
            that.setState({image: commonData.imageFileUri});
            that.setState({audioFileUri: commonData.audioFileUri});
            //that.state.image = commonData.imageFileUri;
            //that.state.audioFileUri = commonData.audioFileUri;
        })
    }


    render() {
        let {image} = this.state;
        let commonData = CommonDataManager.getInstance();
        this.state.image = commonData.imageFileUri;
        this.state.audioFileUri = commonData.audioFileUri;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


                    <View style={styles.helpContainer}>
                        <TouchableOpacity onPress={this._handleUpload} style={styles.helpLink}>
                            <Text style={styles.helpLinkText}>Upload</Text>
                        </TouchableOpacity>
                    </View>

                    {image && <Image source={{uri: image}} style={{width: 200, height: 200}}/>}
                    <View>
                        <Text>{this.state.audioFileUri}</Text>
                    </View>
                </ScrollView>


            </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
                    tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };

    _handleUpload = async () => {
        /*const {Location, Permissions} = Expo;
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const {status2} = await Permissions.askAsync(Permissions.CAMERA);

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            //aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
        else {
            throw new Error('Location permission not granted');
        }

        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects*/

        //let commonData = CommonDataManager.getInstance();
        //this.setState({image: result.uri});
        let commonData = CommonDataManager.getInstance();

        var imageFilename = commonData.imageFileUri.replace(/^.*[\\\/]/, '');
        formData.append('image', {uri: commonData.imageFileUri, name: filename, type});
        type = "audio";


        //commonData.setUserID("User1");
        //commonData.audioFileUri = info.uri;

        //var path = "file:///Users/chris/Library/Developer/CoreSimulator/Devices/9ED2720C-DB04-4CEC-B079-B2E0FB1D605E/data/Containers/Data/Application/50D353C7-8CEF-4C5B-B13E-0828B5BBD06D/Library/Caches/ExponentExperienceData/%2540chrisbarry%252Fdry/AV/recording-A8BBB717-44B0-468F-AC04-37BDA47F487E.caf";
        var path = commonData.audioFileUri;
        var audioFilename = path.replace(/^.*[\\\/]/, '');
        audioFilename = audioFilename.slice(0, -4);
        audioFilename += ".wav";

        formData.append('audio', {uri: path, name: audioFilename, type});
        return await fetch("http://127.0.0.1:8000/social/spot-av-upload/", {
            method: 'POST',
            body: formData,
            header: {
                'content-type': 'multipart/form-data',
            },
        });
    };


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});