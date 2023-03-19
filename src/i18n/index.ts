import { createI18n } from 'vue-i18n'

type SingleModuleType = Record<string, string>
type ModuleType = Record<string, SingleModuleType>

const zhCNObj = getLangObj(
  import.meta.glob(['./zh/*.ts', '!./zh/index.ts'], {
    import: 'default',
    eager: true
  })
)
const enUSObj = getLangObj(
  import.meta.glob(['./en/*.ts', '!./en/index.ts'], {
    import: 'default',
    eager: true
  })
)

type MessageSchema = typeof enUSObj
export default createI18n<[MessageSchema], 'en-US' | 'zh-CN'>({
  locale: 'zh-CN',
  messages: {
    'zh-CN': zhCNObj,
    'en-US': enUSObj
  }
})

function getLangObj(modules: ModuleType) {
  const fileNameReg = /^(.+)\.ts$/
  const res: ModuleType = {}
  for (const key in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, key)) {
      const fileName = key.match(fileNameReg)?.[1]
      if (fileName) {
        res[fileName] = modules[key] as SingleModuleType
      }
    }
  }

  return res
}
