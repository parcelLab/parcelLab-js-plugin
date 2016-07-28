# parcelLab Javascipt Plugin
JavaScript plugin used to retrieve and display trackings from parcelLab on any given webpage.
This plugin uses the v2 api and is under development. - use with caution!

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

### Deploy - coming soon !!!
```bash
$ npm run deploy
```

### Adding dev scripts
There are no scripts in this project. All dev cycles are maintained in the Makefile.  
Just add a target and write your commands.

## For users
### Adding to your webpage
Just add the two minified files (`parcelLab.min.js` and `parcelLab.min.css` and `fontawesome.min.css`) to your webpage.
```html
<head>
  ...
  <link rel="stylesheet" href=".../parcelLab.min.css" >
</head>
<body>
  ...
  <script src=".../parcelLab.min.js" charset="utf-8"></script>
</body>  
```

### Initialize the magic
After adding the script you will have a new ParcelLab class in your global scope. Just create a new instance, with the rootDomId as a parameter and initialize it and you are good to go!
```html
...
<script src=".../parcelLab.min.js" charset="utf-8"></script>
<script type="text/javascript">
  var parcelLab = new ParcelLab('#pl-trace');
  parcelLab.initialize();
</script>
```
For more information read the users manual [here]('').
