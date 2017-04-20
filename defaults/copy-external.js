exports.needs = {
  config: { sync: {load: 'first' } },
}

exports.gives = {
  message: { sync: { context: true }}
}

exports.create = function (api) {

  return {message: {sync: {context: function (msg, ev) {
    var gateway = api.config.sync.load()
      .gateway || 'http://viewer.scuttlebot.io'

    return {
      label: 'Copy external link',
      click: () => require('electron')
        .clipboard.writeText(gateway+'/'+encodeURIComponent(msg.key))
    }
  }}}}
}






