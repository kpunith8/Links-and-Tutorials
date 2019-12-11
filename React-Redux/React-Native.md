## Libraries

- `react-navigation` - TabNavigation, Drawers and other stuff
- `native-base` - Javascript based UI for react-native-elements
- `react-native-elements`
- `react-native-vector-icons` - Vector Icons

## Links

- http://www.reactnativeexpress.com
- https://github.com/nathvarun/React-Native-Layout-Tutorial-Series/blob/master/Project%20Files/04.%20Instagram%20Profile%20Tab/Components/MainScreen.js

## Youtube Channels:

- Unsure Programmer

## Ways to create react-native apps

### Using `react-native-cli` - requires `android studio`

```
$ npm install -g react-native-cli

# Create an app using,
$ react-native init AwesomeProject

# Run the project in emulator or device
$ react-native run-android
```

### Using `create-react-native-app` (CRNA) - Needs `expo client`

- Needs to be in the same Wi-Fi network to run the app and test it
  check `expo.io` for documentation.

```
$ create-react-native-app SampleApp

# Run the project in emulator
$ npm run android
```

# Using react-navigation

- Import the icons
  ```
  import EntypoIcon from 'react-native-vector-icons/Entypo'
  ```

- Removes the default header from navigation, this can be updated in entry point where TabNavigation declared
  ```
  static navigationOptions = {
    header: null
  }
  ```

- Add custom Header using, native-base's Header, Left and Right

- To update the navigation icon:

```javascript
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="person" style={{ color: tintColor }} />  // Icon from native-base
    )
  }
```

# Using native-base

```javascript
  <Container>
    <Header>
      <Left>
        <Icon name='' style={{paddingLeft: 10}}> </Icon>
      </Left>
      <Body>
        <Text> Sample </Text>
      </Body>
      <Right>
        <EntypoIcon name='' style={{paddingRight: 10}} </EntypoIcon>
      </Right>
    </Header>
    <Content>
      // Multiple views can be added
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Image source={require(./assets/sample.jpg)} style={{width: 75, height: 75, borderRadius: 37.5}}/>
        </View>
        <View style={{flex: 3}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{alignItems: 'center'}}>
              <Text>10</Text>
              <Text>posts</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text>100</Text>
              <Text>followers</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text>200</Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>
      </View>
      </View>
    </Content>
  <Container>
```

## react-native for web

-
