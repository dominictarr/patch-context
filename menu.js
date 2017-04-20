function ancestor (el, cssClass) {
  if(!el) return
  if(el.classList.contains(cssClass))
    return el
  else
    return ancestor(el.parentElement, cssClass)
}


exports.needs =  {
  sbot: { async: {get: 'first' }},
  message: {sync: {context: 'map'}}
}

exports.gives = {
  app: {sync: {window: true }}
}

exports.create = function (api) {
  return {
    app: {
      sync: {
        window: function (window) {
    console.log('DECORATE WINDOW',require('is-electron')())
    if(!require('is-electron')()) return window

    var electron = require('electron')

    window.addEventListener('contextmenu', function (ev) {
      ev.preventDefault()
      var message = ancestor(ev.target, 'Message')
      var key = message && message.dataset && message.dataset.id
      console.log('GET', key, message, ev.target, ev.target.parentElement)
      api.sbot.async.get(key, function (err, msg) {
        var menu = new electron.remote.Menu

        if(err) return console.error(err.stack)
        console.log("context_menu", msg)
        var items = api.message.sync.context({key: key, value: msg}, ev)
        items.forEach(function (item) {
          if(item) menu.append(new electron.remote.MenuItem(item))
        })
        menu.popup(electron.remote.getCurrentWindow())
      })
    })

    return window
  }}}}
}







