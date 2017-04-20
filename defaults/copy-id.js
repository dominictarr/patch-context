exports.gives = {
  message: { sync: { context: true }}
}

exports.create = function () {
  return {message: {sync: {context: function (msg, ev) {
    return {
        label: 'Copy id',
        click: () => require('electron')
          .clipboard.writeText(msg.key)
      }
  }}}}
}



