# patch-context

add a context menu to patch{bay,work}

this patch module decorates the window.

``` js
//use by adding a line like this to the main app module.
window = api.app.sync.window(window)
```

then merge this into your depject loader.

``` js
combine(
  require('patch-context'),
  ...
)
```

## TODO

make the context menu itself made of modules.

## License

MIT
