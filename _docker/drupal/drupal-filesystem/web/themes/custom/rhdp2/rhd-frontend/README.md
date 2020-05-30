# RHD Front-end Code and Documentation

[Live Documentation Site](https://redhat-developer.github.io/rhd-frontend/)

## Installation, Scripts, and Contributing

- **Clone** the repository
- **Ask** for the Font Awesome license text for the `.npmrc` file
- **Ask** for the alternate registry information for the `.npmrc` file, if building the repo inside of Red Hat.
    - If running the alternate registry and Font Awesome, you will need to set npm `config set strict-ssl`  to `false` (`npm config set strict-ssl false`). Without that, Font Awesome will try to use the alternate registry for installation, which will not work.`
- **Run** ```npm install``` to install npm-tracked dependencies locally

## Component Theme config

Component themes are configured in the following file ```_docker/drupal/drupal-filesystem/web/themes/custom/rhdp2/rhd-frontend/src/styles/rhd-theme/components/_component-styles.scss``` The structure of a theme definition is as follows:-

```javascript
$componentStyles: (
    'dark': (
        'foregroundColor': 'Color used by theme primary content color',
        'backgroundColor': 'Color used by theme primary content background',
        'cardColor': 'Color used by theme card content background',
        'linkColor': 'Color used by theme links',
        'linkHoverColor': 'Color used by theme links:hover',
        'addImagePadding': 'Adds additional theme component padding (true:false) for coloured background themes',
        'buttonOverrides': (
                'm-link': (
                    'Color': #{$malibu},
                    'hover--Color': #{$dodger-blue},
                    'active--Color': #{$dodger-blue},
                    'BorderColor': transparent,
                    'hover--BorderColor': transparent,
                    'active--BorderColor': transparent,
                    'BackgroundColor': transparent,
                    'hover--BackgroundColor': transparent,
                    'active--BackgroundColor': transparent
                ),
                'm-link--secondary': (
                    'Color': #{$white},
                    'hover--Color': #{$alto},
                    'active--Color': #{$alto},
                    'BorderColor': transparent,
                    'hover--BorderColor': transparent,
                    'active--BorderColor': transparent,
                    'BackgroundColor': transparent,
                    'hover--BackgroundColor': transparent,
                    'active--BackgroundColor': transparent
                ),
                'm-secondary': (
                    'Color': #{$white},
                    'hover--Color': #{$black},
                    'active--Color': #{$black},
                    'BorderColor': #{$white},
                    'hover--BorderColor': #{$white},
                    'active--BorderColor': #{$white},
                    'BackgroundColor': transparent,
                    'hover--BackgroundColor': #{$white},
                    'active--BackgroundColor': #{$white}
                ),
                'm-secondary-alt': (
                    'Color': #{$white},
                    'hover--Color': #{$black},
                    'active--Color': #{$black},
                    'BorderColor': #{$white},
                    'hover--BorderColor': #{$white},
                    'active--BorderColor': #{$white},
                    'BackgroundColor': transparent,
                    'hover--BackgroundColor': #{$white},
                    'active--BackgroundColor': #{$white}
                ),
                'm-tertiary': (
                    'Color': #{$white},
                    'hover--Color': #{$black},
                    'active--Color': #{$black},
                    'BorderColor': #{$white},
                    'hover--BorderColor': #{$white},
                    'active--BorderColor': #{$white},
                    'BackgroundColor': transparent,
                    'hover--BackgroundColor': #{$white},
                    'active--BackgroundColor': #{$white}
                )
            )
    )
);
```

Any variable with color in the name takes any valid color: property or scss variable or css var(), it is applied to a color: or background-color: css property. When using a scss variable use it inside a #{$variable}.

Please define colors for all button types listed in the above example.

## Making IE 11 legacy CSS

There are three files checked into the theme/rhdp2/css folder rhd.ie11-overrides.css, rhd.ie11.css & rhd.ie11.min.css the last two files are created by running '''code 
npm run styles:ie11postProcess
'''
this process can take up to 2 hours to run so is not part of the normal build, if you change or add any scss please run this and check in the new files.

rhd.ie11-overrides.css is a custom file loaded in ie11 additionaly to the other css this can have any specific IE11 overrides, you do not need to run the 'styles:ie11postProcess' as this file is not auto generated, it simply needs to be changed and checked in.

## Using Clamp styles

to apply a cross browser line clamp to a item apply the class "line-clamp-*" where the "*" is the numebr of lines you want to clamp e.g. "line-clamp-2" will only display 2 lines before adding ... to the end of the text valid numebrs are intergers "1 to 10".

only to be used on heading "H" tags and paragraph "P" tags.

## Credits

* NodeJS
* JSDoc
* SASSDoc
* TypeScript
* ESLint
* Karma
* Jasmine
* Semantic-Release
* UglifyJS
* FontAwesome
