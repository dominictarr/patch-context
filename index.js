exports.needs = {
  config: { sync: {load: 'first' } }
}
exports.gives = {
  app: {sync: {window: true }}
}

function ancestor (el, cssClass) {
  if(!el) return
  if(el.classList.contains(cssClass))
    return el
  else
    return ancestor(el.parentElement)
}

exports.create = function (api) {

  return {app: {sync: {window: (window) => {
    if(!require('is-electron')()) return window
    var gateway = api.config.sync.load()
      .gateway || 'http://viewer.scuttlebot.io'

    var electron = require('electron')

    window.addEventListener('contextmenu', ev => {
      ev.preventDefault()
      const Menu = electron.remote.Menu
      const MenuItem = electron.remote.MenuItem
      const menu = new Menu()
      menu.append(new MenuItem({
        label: 'Inspect Element',
        click: () => {
          remote.getCurrentWindow().inspectElement(ev.x, ev.y)
        }
      }))

      var message = ancestor(ev.target, 'Message')
      var id = message && message.dataset && message.dataset.id
      if (id) {
        menu.append(new MenuItem({
          label: 'Copy id',
          click: () => clipboard.writeText(id)
        }))
        menu.append(new MenuItem({
          label: 'Copy hyperlink',
          click: () => electron.clipboard.writeText(gateway+'/'+encodeURIComponent(message.dataset.id))
        }))
      }
      if (message && message.dataset && message.dataset.text) {
        menu.append(new MenuItem({
          label: 'Copy text',
          click: () => electron.clipboard.writeText(message.dataset.text)
        }))
      }
      menu.popup(electron.remote.getCurrentWindow())
    })

    return window
  }}}}
}

