let Theme = {
    mainColor: 'teal',
    borderColor: 'gray',
    fontColor: 'black',
    buttonFontColor: 'white',
    simpleBackground: 'white',
    buttonIconColor: '#FFFFFF',
    goodColor: 'orange',
    badColor: 'red',
    normalColor: 'blue',
    statusBarStyle: 'light-content',
    selectedButtonBackgroundColor: '#FFCC99',
    mainPaddingLeft: 5,
    statusFontSize: 20,
    listItemButtonSize: 18,
    itemListAvatarIconSize: 30,
    mainButtonIconSize: 32,
};

Theme.mainButtonStyle = {
    backgroundColor: Theme.mainColor
};

Theme.listAvatarStyle = {
    borderWidth: 2,
    borderColor: Theme.mainColor,
    width: 40,
    height: 40
};

Theme.roundButtonContainer = {
    borderWidth: 1,
    borderColor: Theme.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: Theme.mainColor,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
};

export default Theme;