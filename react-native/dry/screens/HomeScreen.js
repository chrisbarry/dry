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
import CommonDataManager from '../data/CommonDataManager';
import {MonoText} from '../components/StyledText';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        image: null,
    };

    render() {
        let {image} = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    /*<View style={styles.welcomeContainer}>
                        <Image
                            source={
                                __DEV__
                                    ? require('../assets/images/robot-dev.png')
                                    : require('../assets/images/robot-prod.png')
                            }
                            style={styles.welcomeImage}
                        />
                    </View>

                    <View style={styles.getStartedContainer}>
                        {this._maybeRenderDevelopmentModeWarning()}

                        <Text style={styles.getStartedText}>Get started by opening</Text>

                        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                            <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
                        </View>

                        <Text style={styles.getStartedText}>
                            Change this text and your app will automatically reload.
                        </Text>
                    </View>

                    <View style={styles.helpContainer}>
                        <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
                            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
                        </TouchableOpacity>
                    </View>*/

                     <View style={styles.helpContainer}>
                        <TouchableOpacity onPress={this._handleCameraOpen} style={styles.helpLink}>
                            <Text style={styles.helpLinkText}>Take photo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.helpContainer}>
                        <TouchableOpacity onPress={this._handlePhotoPick} style={styles.helpLink}>
                            <Text style={styles.helpLinkText}>Pick photo</Text>
                        </TouchableOpacity>
                    </View>


                    {image && <Image source={{uri: image}} style={{width: 200, height: 200}}/>}

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

    _handlePhotoPick = async () => {
        const {Location, Permissions} = Expo;
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const {status2} = await Permissions.askAsync(Permissions.CAMERA);

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            //aspect: [4, 3],
        });

        console.log(result);


        //commonData.setUserID("User1");


        if (!result.cancelled) {
            let commonData = CommonDataManager.getInstance();
            commonData.imageFileUri = result.uri;
            this.setState({image: result.uri});
        }
        else {
            throw new Error('Location permission not granted');
        }
    };

    _handleCameraOpen = async () => {
        const {Location, Permissions} = Expo;
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const {status2} = await Permissions.askAsync(Permissions.CAMERA);

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            //aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            let commonData = CommonDataManager.getInstance();
            commonData.imageFileUri = result.uri;
            this.setState({image: result.uri});
        }
        else {
            throw new Error('Location permission not granted');
        }
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