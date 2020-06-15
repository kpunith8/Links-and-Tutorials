## Build Flutter Apps without installing the Android Studio in Windows 10 or using Android Command-Line Tools

- Download openJDK-8, `sdkmanager` works well with this version.
  https://adoptopenjdk.net/

- Issues running `sdkmanager`  on JDK  9 or higher refer,
  https://stackoverflow.com/questions/46402772/failed-to-install-android-sdk-java-lang-noclassdeffounderror-javax-xml-bind-a

- Download Android Command Line tools from
  https://developer.android.com/studio/

- Extract the command-line tools to a folder under `C:/android` - This would be your `ANDROID_PATH` variable.

- Install android sdk, platform tools using `sdkmanager`
```
$ sdkmanager "build-tools;28.0.3" "platform-tools" "platforms;android-28"
```

- Set the `C:\android\tools\bin` and `C:\android\platform-tools` folders to `path` variable

- Download the system image and google-apis for emulator to run properly.
```
$ sdkmanager "system-images;android-28;google_apis;x86"
```

- Accept all licenses
```
$ sdkmanager --licenses
```

- Set the `ANDROID_PATH` variable to `C:\android` where all platform tools, platform, tools, and emulators are installed are installed using `sdkmanager`

- Update the `SDK` using
```
$ sdkmanager --update
```

- Create an emulator using command line with `avdmanager`
```
$ avdmanager create avd -n my-emulator -k "system-images;android-28;google_apis;x86"
```

- List the emulators and start an emulator
```
$ avdmanager list
```

- Delete an emulator
```
$ avdmanager delete avd -n my-emulator
```

- Go to `emulator` directory under `C:\android\emulator` and start the emulator by running,
```
$ emulator -avd my-emulator
```

- Fix the issues in emulator (If emulator hangs for a long time)
```
// working solution
$ emulator @avd_name -no-snapshot-load

// Not tried, not sure whether it works or not
$ emulator -avd my_avd -prop persist.sys.language=en -prop persist.sys.country=GB
```

- To test the app in release mode, run
```
$ flutter run --profile
```

## Samples

- Set `debugPaintSizeEnabled`  to `true` so that you can see the `visual layout`. For more information, see Visual debugging(https://flutter.dev/docs/testing/debugging#visual-debugging), a section in Debugging Flutter apps(https://flutter.dev/docs/testing/debugging).

- Declare static assets in `pubspec.yml` file, ex, https://github.com/flutter/website/blob/master/examples/layout/row_column/pubspec.yaml

## Flutter for web - beta

- Download and install the `flutter SDK` and set the `PATH` variable based on your OS

- Install `flutter` and `dart` plugins to `Visual Studio Code` to create flutter projects.

- Run `flutter doctor` to make sure everything is setup properly.

- Open the Visual studio code and select `Flutter: New Project` option in `Command Palette` (Open Command Palette pressing `F1`)

- Once the app created, run the app in debug mode by pressing `F5` - it takes few minutes to build the app.

- Make the changes while updating, app hot reloads instantly, for web apps press `r` or `R`

### Setup

- Run the following commands to setup for web
  ```
  $ flutter channel beta
  $ flutter upgrade
  $ flutter config --enable-web
  ```

- Once done whether tools for chrome installed as device and listed when running,
  ```
  $ flutter devices
  ```

- Create the project from VS code as usual

- Add the support for existing flutter app
  ```
  $ flutter create .
  ```

- Run the project in command line,
  ```
  $ flutter run -d chrome
  ```

- Build the project to generate the release build
  ```
  $ flutter build web
  ```

### Sample App - PWA

- Generate app `manifest.json` for PWA, in https://app-manifest.firebaseapp.com

- Use `surge` to deploy the app or `peanut`


## Layouts and Widgets

### Row and Column

- `Row` and `Column` are classes that contain and lay out widgets. Widgets inside
  of a Row or Column are called `children`, and Row and Column are referred to as parents.
  Row lays out its widgets `horizontally`, and Column lays out its widgets `vertically`.
  ```javascript
  import 'dart:async';
  import 'package:flutter/material.dart';
  import 'package:flutter_test/flutter_test.dart';

  class MyWidget extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Row( // Could be column
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          BlueBox(),
          BlueBox(),
          BlueBox(),
        ],
      );
    }
  }

  class BlueBox extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Container(
        width: 50,
        height: 50,
        decoration: BoxDecoration(
          color: Colors.blue,
          border: Border.all(),
        ),
      );
    }
  }
  ```

- `mainAxisSize`

  - It determines `how much space` a Row and Column can `occupy` on their main axes.

  - `MainAxisSize.max` - `default value` - Row and Column occupy all of the space on their main axes.
     If the combined width of their children is less than the total space on their main axes,
     their children are laid out with extra space.

  - `MainAxisSize.min` - Row and Column only occupy enough space on their main axes for their children.
    Their children are laid out `without extra space` and at the `middle of their main axes`.

- `mainAxisAlignment`

  - It determines how Row and Column can `position their children` in that extra space.
    mainAxisAlignment has `six` possible values:

  - `MainAxisAlignment.start`
    Positions children near the beginning of the main axis. (Left for Row, top for Column)

  - `MainAxisAlignment.end`
    Positions children near the end of the main axis. (Right for Row, bottom for Column)

  - `MainAxisAlignment.center`
    Positions children at the middle of the main axis.

  - `MainAxisAlignment.spaceBetween`
    Divides the extra space evenly between children.

  - `MainAxisAlignment.spaceEvenly`
    Divides the extra space evenly between children and before and after the children.

  - `MainAxisAlignment.spaceAround`
    Similar to MainAxisAlignment.spaceEvenly, but reduces half of the space before the
    first child and after the last child to half of the width between the children.

- `crossAxisAlignment`

  - It Determines how Row and Column can `position their children on their cross axes`.
    A `Row’s` cross axis is `vertical`, and a `Column’s` cross axis is `horizontal`.
    The crossAxisAlignment property has `five` possible values:

  - `CrossAxisAlignment.start`
    Positions children near the start of the cross axis. (Top for Row, Left for Column)

  - `CrossAxisAlignment.end`
    Positions children near the end of the cross axis. (Bottom for Row, Right for Column)

  - `CrossAxisAlignment.center`
    Positions children at the middle of the cross axis. (Middle for Row, Center for Column)

  - `CrossAxisAlignment.stretch`
    Stretches children across the cross axis. (Top-to-bottom for Row, left-to-right for Column)

  - `CrossAxisAlignment.baseline`
    Aligns children by their character baselines. (`Text` class only,
    and requires that the textBaseline property is set to `TextBaseline.alphabetic`)
    ```javascript
    import 'dart:async';
    import 'package:flutter/material.dart';
    import 'package:flutter_test/flutter_test.dart';

    class MyWidget extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            BlueBox(),
            BiggerBlueBox(),
            BlueBox(),
          ],
        );
      }
    }

    class BlueBox extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return Container(
          width: 50,
          height: 50,
          decoration: BoxDecoration(
            color: Colors.blue,
            border: Border.all(),
          ),
        );
      }
    }

    class BiggerBlueBox extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return Container(
          width: 50,
          height: 100,
          decoration: BoxDecoration(
            color: Colors.blue,
            border: Border.all(),
          ),
        );
      }
    }
    ```

### Flexible

- The Flexible widget wraps a widget, so the widget becomes `resizable`. When the
  `Flexible` widget wraps a widget, the widget becomes the Flexible widget’s child and is considered flexible.

- After inflexible widgets are laid out, the widgets are `resized` according to their `flex` and `fit` properties.

- `flex`: Compares itself against other flex properties before determining what
  fraction of the total remaining space each Flexible widget receives.

- `fit`: Determines whether a Flexible widget fills all of its extra space.

  - It can have one of two values:

  - `FlexFit.loose`: The widget’s preferred size is used. (Default)

  - `FlexFit.tight`: Forces the widget to fill all of its extra space.
  ```javascript
  return Row(
    children: [
      BlueBox(),
      Flexible(
        fit: FlexFit.tight, // loose is default
        flex: 1,
        child: BlueBox(),
      ),
      Flexible(
        fit: FlexFit.tight,
        flex: 1,
        child: BlueBox(),
      ),
    ],
  );
  ```

  - The Flexible widgets contain `flex` properties with `flex values set to 1` (Default)

  - When `flex` properties are compared against one another, the `ratio between their` flex
    values determines what fraction of the total remaining space each Flexible widget receives.
    ```
    remainingSpace * (flex / totalOfAllFlexValues)
    ```

  - In the above example, the sum of the flex values (2), determines that both
    `Flexible` widgets `receive half of the total remaining space`.
    The BlueBox widget (or fixed-size widget) remains the same size.

  - Change the `flex` prop value to `2` for the Flexible Child, it occupies double the
    space of other Flexible child with prop fit: `FlexFir.tight`

### Expanded

- Similar to `Flexible`, the `Expanded` widget can `wrap a widget` and `force` the widget to `fill extra space`.
  ```javascript
  return Row(
    children: [
      BlueBox(),
      Expanded(child: BlueBox()), // Fills all the space in a row for this child
      BlueBox(),
    ],
  );
  ```

> Use `Flexible` to resize widgets in a `Row` or `Column`. That way, you can adjust a child widget’s spacing
  while keeping its size in relation to its parent widget.
  `Expanded` changes the constraints of a child widget, so it `fills any empty space`.

### SizedBox

- The `SizedBox` widget can be used in one of two ways when creating exact dimensions.

  - When SizedBox wraps a widget, it `resizes the widget` using the `height` and `width` properties.
    ```javascript
    return Row(
      mainAxisSize: MainAxisSize.max,
      children: [
        BlueBox(),
        SizedBox(
          width: 200,
          child: BlueBox(),
        ),
        BlueBox(),
      ],
    );
    ```

  - When it `doesn’t wrap a widget`, it uses the `height` and `width` properties to `create empty space`.
    ```javascript
    return Row(
      children: [
        BlueBox(),
        SizedBox(width: 50),
        BlueBox(),
        BlueBox(),
      ],
    );
  ```

### Spacer

- Similar to SizedBox, the Spacer widget also can create `space between widgets`.
  ```javascript
  // Create a equal amounts of space between all three BlueBox's
  return Row(
    children: [
      BlueBox(),
      Spacer(flex: 1),
      BlueBox(),
      Spacer(flex: 1),
      BlueBox(),
    ],
  );
  ```

> Use `Spacer` when you want to `create space` using a `flex` property.
  Use `SizedBox` when you want to `create space` using a `specific number of logical pixels`.

### Text

- The Text widget `displays text` and can be configured for different `fonts`, `sizes`, and `colors`.
  ```javascript
  return Row(
    crossAxisAlignment: CrossAxisAlignment.center, // change to baseline, which aligns by their char baselines
    textBaseline: TextBaseline.alphabetic,
    children: [
      Text(
        'Hey!',
        style: TextStyle(
          fontSize: 30,
          fontFamily: 'Futura',
          color: Colors.blue,
        ),
      ),
      Text(
        'Hey!',
        style: TextStyle(
          fontSize: 50,
          fontFamily: 'Futura',
          color: Colors.green,
        ),
      ),
      Text(
        'Hey!',
        style: TextStyle(
          fontSize: 40,
          fontFamily: 'Futura',
          color: Colors.red,
        ),
      ),
    ],
  );
  ```

### Icon

- The Icon widget displays a graphical symbol that represents an aspect of the UI.
  ```javascript
  return Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    textBaseline: TextBaseline.alphabetic,
    children: [
      Icon(
        Icons.widgets,
        size: 50,
        color: Colors.blue,
      ),
      Icon(
        Icons.widgets,
        size: 50,
        color: Colors.red,
      ),
      Icon(
        Icons.favorite,
        color: Colors.amber,
        size: 50.0
      ),
    ],
  );
  ```

### GridView

- Use `GridView` to lay widgets out as a `two-dimensional list`. GridView
  provides two pre-fabricated lists, or you can build your own custom grid.
  When a GridView detects that its contents are too long to fit the render box, it automatically `scrolls`.

- `GridView.count` allows you to specify the `number of columns`.

- `GridView.extent` allows you to specify the `maximum pixel width of a tile`.

### Image

- The Image widget displays an image. You either can reference images using a `URL`,
  or you can include images inside your app package.
  ```javascript
  Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      Image.network('https://github.com/flutter/website/blob/master/examples/layout/sizing/images/pic1.jpg?raw=true'),
    ],
  );
  ```

### SafeArea

- To make the text or content visible on mobiles with `notch` and `curved phones`, wrap it with SafeArea,
  specify the dimensions
  ```javascript
  SafeArea(
    child: ListView(
      childer: List.generate(
        100,
        (i) => Text('This is some text')
      ),
    ),
    bottom: true,
    top: true, // use left and right
  );
  ```

- Can be wrapped by a Scaffold too
  ```Javascript
  Scaffold(
    body: SafeArea(
      child: ...
    )
  );
  ```

### Wrap

- It lays out the children one at a time, if no space it wraps to `next line`, depends on `Row` or Column
  ```javascript
  Wrap(
    direction: Axis.vertical,
    alignment: WrapAlignment.end,
    spacing: 10.0,
    runSpacing: 20.0,
    children: [],
  )
  ```

### AnimatedContainer

- For implicit animations, `borders`, `shapes`, `pading`, `height`, `width`, and more can be animated
  ```javascript
  AnimatedContainer(
    color: _color,
    duration: _duration,
    curve: Curves.bounceIn,
    child: MyWidget(),
  )
  ```

### Opacity and AnimatedOpacity

- To hide the widget, but it is will be in the app
  ```javascript
  Opacity(
    opacity: 0.0,
    child: MyWidget(),
  )
  ```

- Can also be used to blending stack on one another.
  ```JavaScript
  Stack(
    children: [
      MyWidget(),
      Opacity(
        opacity: 0.25,
        child: AnotherWidget()
      )
    ]
  )
  ```

### FutureBuilder

- Display one thing while loading, for async data loading
  ```JavaScript
  FutureBuilder(
    future: http.get('http://blah.com/cars'),
    builder: (context, snapshot) {
      if(snapshot.connectionState == ConnectionState.done) {
        if(snapshot.hasError) {
          return SomethingWentWrong();
        }
        return someData(snapshot.data);
      } else {
        return CircularProgressIndicator();
      }
    }
  )
  ```

### FadeTransition

- To fade a child inside out
  ```JavaScript
  class _MyFadeInState extends State<MyFadeIn> with
    SingleTickerProviderStateMixin {
      AnimationController _controller;
      Animation _animation;

      @override
      initState() {
        _controller = AnimationController(
          vsync: this,
          duration: Duration(seconds: 2)
        );
        _animation = Tween(
          begin: 0.0,
          end: 1.0,
        ).animate(_controller)
      }

      @override
      dispose() {
        _controller.dispose();
        super.dispose();
      }

      @override
      Widget build(BuildContext context) {
        controller.forward();
        return FadeTransition(
          opacity: _animation,
          child: Text(...)
        );
      }
  }
  ```

- It is good idea to keep it in a `StatefulWidget`, to track the state

### FloatingActionButton

- Add floating action button with bottom navigation
  ```JavaScript
  Scaffold(
    floatingActionButton: FloatingActionButton(
      child: Icon(Icons.add),
      onPressed: () {}
    ),
    bottomNavigationBar: BottomAppBar(
      color: Colors.yellow,
      child: Container(height: 50.0)
    ),
    floatingActionButtonLocation:
      floatingActionButtonLocation.endDocked, // centerDocked
  );
  ```

### PageView

- To add `multiple pages` to the app, load different pages on swipe left or right
  ```JavaScript
  _controller = PageController(
    initialPage: 1
  )

  PageView(
    controller: _controller,
    scrollDirection: Axis.vertical, // to scroll vertically
    children: [
      myPage1Widget(),
      myPage2Widget(),
      myPage3Widget(),
    ]
  );
  ```

### Table

```JavaScript
Table(
  children: [
    TableRow(
      children: [
        WideWidget(),
        MediumWidget(),
      ]
    ),
    TableRow(
      children: [
        NarrowWidget(),
        MediumWidget(),
      ]
    ),
  ],
  defaultVerticalAlignment: TableCellVerticalAlignment.bottom, // middle
  defaultColumnWidth: FlexColumnWidth(1.0), // FractionColumnWidth(0.25), IntrinsicColumnWidth()
  border: TableBorder.all()
)
```

### SliverAppBar - use with CustomScrollView -

- Custom `scroll behavior` to the app bar
  ```JavaScript
  CustomScrollView(
    slivers: <Widget> [
      SliverAppBar(
        title: Text('Sliver App Bar'),
        expandedHeight: 200.0,
        flexibleSpace: FlexibleSpaceBar(
          background: _expandedImage,
        ),
        floating: true, // to make it reappear when scrolled
      ),
      _oneSliver(),
      _anotherSLiver(),
    ],
  )
  ```

- `SliverList` and `SliverGrid`

### Other Widgets

- `InheritedModel`

- `ClipRRect`, `ClipOval`, `ClipPath` - Clip images

- `Hero`

- `CustomPaint` - Draw custom shapes

- `ToolTip` - Show tooltip, material UI already has this builtin

- `FittedBox` - Fit the child component on parent

- `LayoutBuilder` - Change the layout based on

- `AbsorbPointer` - Control the touch on each widget, blocks the touch event

- `Transform` - Perspective on Flutter

- `BackdropFlutter`

- `Align` - Align items in the stack

- `Positioned`

- `Dismissible` - Swipe left to hide or delete action

- `ValueListenableBuilder` - `InheritedWidget` to access value across the widgets

- `Draggable`

- `AnimatedList`

- `Flexible`

- `MediaQuery` - 

## State Management

- BLoC - Rx and Streams

- ScopedModel

- package:provider

## Use container to add borders

```javascript
Container(
  decoration: BoxDecoration(
     border: Border.all(
       color: Colors.blue,
     ),
     // borderRadius: BorderRadius.circular(20.0),
   ),
   child: Column(...)
)
```


## Widgets to lookout

- Stack -> Positioned
- Transform
- AnimationController - with SingleTickerProviderStateMixin
  ```javascript
  class _MyHomePageState extends State<MyHomePage>
    with SingleTickerProviderStateMixin {
      AnimationController _animationController;

      @override
      void initState() {
        super.initState();
        _animationController = AnimationController(
          vsync: this,
          duration: Duration(seconds: 1),
        );
        _animationController.forward()
      }

      @override
      Widget build(BuildContext context) {
        return AnimatedBuilder(
          animation: _animationController,
          child: MyCard(number: 1),
          builder: (context, child) => Transform.rotate(
            angle: _animationController.value * math.pi,
            child: child
          ),
        );
      }
    }
  ```

## Links

- [Material Icons](https://api.flutter.dev/flutter/material/Icons-class.html)

- [Adding Images and Assets](https://flutter.dev/docs/development/ui/assets-and-images)
