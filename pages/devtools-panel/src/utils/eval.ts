const execute = (expression: string | Function, ...args: any[]) => {
  if (typeof expression === 'function') {
    expression = `(${expression})`
    if (args.length) {
      const expressionArgs = JSON.stringify(Array.prototype.slice.call(args, 1))
      expression += `.apply(this, ${expressionArgs})`
    } else {
      expression += '()'
    }
  }

  expression = `
    (function () {
      window.__devtron = window.__devtron || {}
      window.__devtron.evaling = true

      var require = window.__devtron.require || window.require
      var process = window.__devtron.process || window.process

      try {
        return ${expression}
      } finally {
        window.__devtron.evaling = false
      }
    })()
  `

  return new Promise((resolve, reject) => {
    window.chrome.devtools.inspectedWindow.eval(expression, (result, error) => {
      if (error) {
        // if (error.isException && error.value) {
        //   let stack = error.value
        //   error = new Error(stack.split('\n')[0])
        //   error.stack = stack
        // }
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

export const getFileSize = (path: string) => {
  return execute((path: string) => {
    try {
      return require('fs').statSync(path).size
    } catch (error) {
      return -1
    }
  }, path)
}

export const openExternal = (urlToOpen: string) => {
  return execute((urlToOpen: string) => {
    return require('electron').shell.openExternal(urlToOpen)
  }, urlToOpen)
}

export const isDebugMode = () => {
  return execute(() => {
    return process && !!process.env.DEVTRON_DEBUG_PATH
  })
}

export const isApiAvailable = () => {
  return execute(() => {
    return typeof process === 'object' && typeof require === 'function'
  })
}

// Start a local http server in the currently running app that will
// listen to requests sent by a browser
export const startServer = () => {
  return execute(() => {
    const path = require('path')
    const serverPath = path.join(process.env.DEVTRON_DEBUG_PATH, 'test', 'server.js')
    require(serverPath)
  })
}

// Implement the window.chrome.devtools.inspectedWindow.eval API via
// window.fetch talking to a local http server running in an opened Electron app
export const proxyToServer = () => {
  window.chrome.devtools = {
    inspectedWindow: {
      eval: function (expression: string, callback: Function) {
        window.fetch('http://localhost:3948', {
          body: JSON.stringify({ expression }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then((response) => {
          return response.json()
        }).then((json) => {
          callback(json.result)
        }).catch((error) => {
          callback(null, error)
        })
      }
    }
  }
}
