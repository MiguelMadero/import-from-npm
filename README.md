# Import-from-npm


This is probably a bad idea and official support is coming soon. This won't work CommonJS modules and it won't create shims for require modules. However if the node_module you're after will work by simply importing (e.g. lodash, lgtm) or you're happy writing the shim yourself this can be a good solution for you. 

Simply install it: 

```
ember install import-from-npm
```

Then import from node_modules in the same way you would from bower. 

```
app.import(app.nodeModulesDirectory + '/path/to/my.js');
```

## Running

* `git clone` this repository
* `npm install`
* `bower install`


* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
