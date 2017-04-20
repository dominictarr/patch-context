exports.gives = {
  message: { sync: { context: true }}
}

exports.create = function () {
  return {message: {sync: {context: function (msg, ev) {
    if(!msg || !msg.value.content.text) return
    return {
      label: 'Copy text',
      click: () => require('electron')
        .clipboard.writeText(msg.value.content.text)
    }
  }}}}
}



