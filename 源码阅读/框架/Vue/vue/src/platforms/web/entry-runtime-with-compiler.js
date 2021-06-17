/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'


//cached用于回调函数的返回值
const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)//如果传递了el，查找对应dom元素(选择器查找或者自身)

  /* istanbul ignore if */
  //body或者根元素，不允许作为挂载对象
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options//创建Vue实例时的配置项
  // resolve template/el and convert to render function
  //如果没有传递render，将传递的template或者el转化为一个render函数
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        //如果template是以#开头的字符串
        if (template.charAt(0) === '#') {
          //当做id选择器去查找对应的元素，并获取innerHTML
          template = idToTemplate(template)
          /* istanbul ignore if */
          //如果没有查找到元素，或者元素的内容为空，提示
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        //如果是一个node节点，获取其innerHTML（因为传递了template，代表）
        template = template.innerHTML
      } else {
        //传入的template仅支持以上两种（id选择器，或者node节点）
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {//el是Vue实例的挂载目标
      //如果没有传入render或者template，传递了el,获取el的outerHTML作为模板
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      //性能测量
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      //添加生成的render函数到配置对象
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
//获取元素的outerHTML
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
