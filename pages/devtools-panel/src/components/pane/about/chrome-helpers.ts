export const chromeAPIs = (() => {
  const apis: Record<string, boolean> = {}
  function scanAPI (object: Record<string, unknown>, path = 'chrome'): string[] | undefined {
    // 跳过非对象或数组
    if (!object || typeof object !== 'object' || Array.isArray(object)) return
    // 检查是否为空对象
    const keys = Object.keys(object)
    if (keys.length === 0) {
      apis[path] = true
      return
    }
    // 扫描对象自身属性
    let hasChildObjects = false
    for (const key in object) {
      const value = object[key]
      const fullPath = `${path}.${key}`
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        hasChildObjects = true
        scanAPI(value as Record<string, unknown>, fullPath)
      } else {
        // 只有叶子节点才加入 apis
        apis[fullPath] = true
      }
    }
    // 如果没有子对象且尚未加入，则当前节点为叶子节点
    if (!hasChildObjects && keys.length > 0) {
      apis[path] = true
    }
    return Object.keys(apis)
  }
  return scanAPI(window.chrome)
})()
