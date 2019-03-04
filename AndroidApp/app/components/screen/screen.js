import React from 'react';
import Styles from './style';
import {Body, Container, Header, Icon, Left, Right, Text} from 'native-base';
import {StatusBar} from 'react-native';
import {Theme} from '../theme';

export const Screen = (props) => {
    let {
        headerTitle,
        children,
        navigation,
        headerStatus
    } = props;
    return (
        <Container style={Styles.container} >
            <StatusBar barStyle={Theme.statusBarStyle} />
            <Header style={Styles.headerContainer} >
                <Left>
                    <Icon
                        name='menu'
                        style = {{color:Theme.mainColor}}
                        onPress = {() => navigation.openDrawer()}
                    />
                </Left>
                <Body style={Styles.headerBody} >
                    <Text style = {Styles.titleText} >{headerTitle}</Text>
                </Body>
                {headerStatus && <Right style={Styles.headerRight} >
                    {headerStatus}
                </Right>}
            </Header>
            <Container style = {Styles.contentContainer} >
            {children}
        </Container>
        </Container>
    );
};