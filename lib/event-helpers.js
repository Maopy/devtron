'use strict'

const Eval = require('./eval')

exports.getEvents = () => {
  return Eval.execute(() => {
    const formatCode = (listener) => {
      let lines = listener.split(/\r?\n/)
      if (lines.length === 1) return listener

      let lastLine = lines[lines.length - 1]
      let lastLineMatch = /^(\s+)}/.exec(lastLine)
      if (!lastLineMatch) return listener

      let whitespaceRegex = new RegExp('^' + lastLineMatch[1])
      return lines.map((line) => {
        return line.replace(whitespaceRegex, '')
      }).join('\n')
    }

    const getEvents = (emitter) => {
      const events = {}
      Object.keys(emitter._events).sort().forEach((name) => {
        let listeners = emitter.listeners(name)
        if (listeners.length > 0) {
          events[name] = listeners.map((listener) => {
            return formatCode(listener.toString())
          })
        }
      })
      return events
    }

    const electron = require('electron')
    const {app, getCurrentWindow, getCurrentWebContents, ipcMain, process: remoteProcess} = require('@electron/remote')
    return {
      '@electron/remote.getCurrentWindow()': getEvents(getCurrentWindow()),
      '@electron/remote.getCurrentWebContents()': getEvents(getCurrentWebContents()),
      '@electron/remote.app': getEvents(app),
      '@electron/remote.ipcMain': getEvents(ipcMain),
      'electron.ipcRenderer': getEvents(electron.ipcRenderer),
      '@electron/remote.process': getEvents(remoteProcess),
      'global.process': getEvents(process)
    }
  })
}
