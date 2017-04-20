exports.gives = {
  message: { sync: { context: true }}
}

exports.create = function () {
  return {message: {sync: {context: function (msg, ev) {
    return {
      label: 'Inspect Element',
      click: () => {
        require('electron')
          .remote.getCurrentWindow().inspectElement(ev.x, ev.y)
      }
    }
  }}}}
}

