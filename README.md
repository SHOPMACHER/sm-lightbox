# smLightbox
smLightbox is a library for creating a lightbox with Slider.

## Table of Contents

* [Installation](#installation)
  * [UMD](#umd)
  * [AMD](#amd)
  * [CommonJS](#commonjs)
  * [ESM](#esm)
* [Usage](#usage)
  * [initialization](#initialization)
  * [Configuration](#configuration)
  * [Options](#options)
* [Contributing](#contributing)
* [License](#license)

## Installation
Run `npm install -S @shopmacher/lightbox` to install the package from npm.
Alternatively, you can download the latest release from this repository.

To include the library, refer to the module definition you are using.

### UMD
Include the `lightbox.js` and `lightbox.css` from the `lib` directory
in your project. This makes `smLightbox` available in the global scope.

### AMD
Adjust your `require.config.js` to include the following code:
```javascript
packages: [{
    name: '@shopmacher/lightbox',
    location: 'node_modules/@shopmacher/lightbox/lib',
    main: 'slightbox'
}]
```

Now you can use the slider in your project like this:
```javascript
define('myModule', ['@shopmacher/lightbox'], function(Lightbox) {
    // Access smSlider object here
});
```

### CommonJS
Require the slider via `const Lightbox = require('@shopmacher/lightbox');` and use
the `Lightbox` variable to access its methods.

### ESM
Import the lightbox via `import Lightbox from '@shopmacher/lightbox';` and access it
via the `Lightbox` variable.

## Usage
This section describes how to initialise and configure the lightbox.

### Initialization
The library can either intialized via a static method for all images that posses the attribute
`"data-lightbox="imageGroup1"`. You can group images with the same group name.

**Static initialization**
```javascript
const lightbox = Lightbox.init();
```

### Configuration
To validate an input, the library provides a set of basic validators that
are controlled via data-attributes. The following example would validate
the input for a minimum length of 5 characters and output the result into
an HTML element.

```html
<img
    src=""
    data-lightbox="imageGroup1"
    data-lightbox-zoom=""
    data-lightbox-thumbnail="" />

```

`data-lightbox="group"` is the group of images that are shown in the lightbox.

`data-lightbox-zoom=""` optional for bigger images, that are used instead of original source

`data-lightbox-thumbnail=""` optional for lower images, that are used instead of original source


### Options
The `options` object that you either pass in the contructor can consist of the following options:

| Option          | Description                                       | Type     | Default Value      |
| --------------- | ------------------------------------------------- | -------- | ------------------:|
| showThumbSlider | Shows the thubmnail slider on bottom              | boolean  | false              |
| showCloseButton | Shows the close button in the right corner on top | boolean  | true               |
| darkBackground  | Excepts rgba or hex colors for the background     | string   | rgba(0, 0, 0, 0.7) |
| mainSlider      | See smSlider Options                              | Object   | undefined          |
| thumbSlider     | See smSlider Options                              | Object   | undefined          |

Please note, that the options must be in an object that is equal to the group name.

Option object example:
```html
{
    imageGroupe1: {
        showThumbSlider: true,
        mainSlider: {
            visibleSlides: 1,
            step: 1,
            infinite: true
        },
        thumbSlider: {
            visibleSlides: 4,
            step: 1,
            infinite: true
        }
    }
}
```

## Contributing
To contribute to this project, fork the repository and create
your feature/hotfix branch with whatever you want to add.

Install the project dependencies using `npm i` and start the
development server via `npm start`. A webpack-dev-server will now
listen on port 8080.

When you are finished developing, make sure to add a documented pull
request.

**Please note:** Pull requests for new features that are not typed via
flowtype as well as not following the general code style used in this
project will be rejected.

## License
MIT