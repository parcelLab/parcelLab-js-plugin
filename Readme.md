# parcelLab Javascript Plugin
JavaScript plugin used to retrieve and display trackings from parcelLab on any given webpage.
This plugin uses the v2 api and is under development. - use with caution!

## For shop users
### Adding to your webpage
Just add the following files (`parcelLab.min.js` and `fontawesome.min.css` and `parcelLab.min.css`) to your webpage. Then just initialize a new parcelLab object.

### Initializing the magic
After adding the script you will have a new ParcelLab class in your global scope. Just create a new instance, with the rootDomId as a parameter and initialize it and you are good to go!

### Example
```html
<head>
  ...
  <link href="https://cdn.parcellab.com/css/v2/parcelLab.min.css" rel="stylesheet">
  <link href="https://cdn.parcellab.com/css/font-awesome.min.css" rel="stylesheet">
</head>
<body>
  ...
  <script src="https://cdn.parcellab.com/js/v2/parcelLab.min.js" charset="utf-8"></script>
  <script type="text/javascript">
    var parcelLab = new ParcelLab('#pl-trace');
    // trackings container will be rendered to dom-elem. with id="pl-trace"
    parcelLab.initialize();
  </script>
</body>  
```

## For developers
### Develop
Start the following commands in new terminal windows. Then
```bash  
$ npm run dev-js
$ npm run dev-scss
$ serve build/
```

### Build
```bash
$ npm run build
```
Minified `parcelLab.min.js` and `parcelLab.min.css` will be in the build dir.


### Test
```bash
$ npm run test
```

### Deploy
```bash
$ npm run deploy
```

### Adding dev scripts
There are no scripts in this project. All dev cycles are maintained in the Makefile.  
Just add a target and write your commands.
