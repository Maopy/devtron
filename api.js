exports.install = () => {
  if (process.type === 'renderer') {
    console.log(`Installing Devtron from ${__dirname}`)
    const { session } = require('@electron/remote')
    const extensions = session.defaultSession.getAllExtensions()
    if (extensions.find(extension => extension.name === 'devtron')) return true
    return session.defaultSession.loadExtension(__dirname)
  } else if (process.type === 'browser') {
    const {resolve} = require('path')
    const extPath = resolve(__dirname)
    console.log(`Installing Devtron from ${extPath}`)
    const { session } = require('electron')
    const extensions = session.defaultSession.getAllExtensions()
    if (extensions.find(extension => extension.name === 'devtron')) return true
    return session.defaultSession.loadExtension(extPath)
  } else {
    throw new Error('Devtron can only be installed from an Electron process.')
  }
}

exports.uninstall = () => {
  if (process.type === 'renderer') {
    console.log(`Uninstalling Devtron from ${__dirname}`)
    const { session } = require('@electron/remote')
    const extensions = session.defaultSession.getAllExtensions()
    const extension = extensions.find(extension => extension.name === 'devtron')
    if (!extension) return false
    return session.defaultSession.removeExtension(extension.id)
  } else if (process.type === 'browser') {
    console.log(`Uninstalling Devtron from ${__dirname}`)
    const { session } = require('electron')
    const extensions = session.defaultSession.getAllExtensions()
    const extension = extensions.find(extension => extension.name === 'devtron')
    if (!extension) return false
    return session.defaultSession.removeExtension(extension.id)
  } else {
    throw new Error('Devtron can only be uninstalled from an Electron process.')
  }
}

exports.path = __dirname
