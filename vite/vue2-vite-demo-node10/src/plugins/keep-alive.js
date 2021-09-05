import { isArray, isRegExp } from 'lodash'
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
function isDef(v) {
  return v !== undefined && v !== null
}
function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory
}

function getFirstComponentChild(children) {
  if (isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      let c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches(pattern) {
  if (isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache(keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const entry = cache[key]
    if (entry) {
      const name = entry.name
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  const entry = cache[key]
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

export default {
  install(app) {
    //只在开发模式下生效
    if (process.env.NODE_ENV === 'development') {
      /**
       * Remove an item from an array.
       */

      const patternTypes = [String, RegExp, Array]

      const KeepAlive = {
        name: 'keep-alive',
        abstract: true,

        props: {
          include: patternTypes,
          exclude: patternTypes,
          max: [String, Number]
        },

        methods: {
          cacheVNode() {
            const { cache, keys, vnodeToCache, keyToCache } = this
            if (vnodeToCache) {
              const { tag, componentInstance, componentOptions } = vnodeToCache
              cache[keyToCache] = {
                name: getComponentName(componentOptions),
                tag,
                componentInstance,
                cid: vnodeToCache.cid
              }
              keys.push(keyToCache)
              // prune oldest entry
              if (this.max && keys.length > parseInt(this.max)) {
                pruneCacheEntry(cache, keys[0], keys, this._vnode)
              }
              this.vnodeToCache = null
            }
          }
        },

        created() {
          this.cache = Object.create(null)
          this.keys = []
        },

        destroyed() {
          for (const key in this.cache) {
            pruneCacheEntry(this.cache, key, this.keys)
          }
        },

        mounted() {
          this.cacheVNode()
          this.$watch('include', val => {
            pruneCache(this, name => matches(val, name))
          })
          this.$watch('exclude', val => {
            pruneCache(this, name => !matches(val, name))
          })
        },

        updated() {
          this.cacheVNode()
        },

        render() {
          const slot = this.$slots.default
          const vnode = getFirstComponentChild(slot)
          const componentOptions = vnode && vnode.componentOptions
          if (componentOptions) {
            vnode.cid = componentOptions.Ctor.cid
            // check pattern
            const name = getComponentName(componentOptions)
            const { include, exclude } = this
            if (
              // not included
              (include && (!name || !matches(include, name))) ||
              // excluded
              (exclude && name && matches(exclude, name))
            ) {
              return vnode
            }

            const { cache, keys } = this
            const key =
              vnode.key == null
                ? // same constructor may get registered as different local components
                  // so cid alone is not enough (#3269)
                  componentOptions.Ctor.cid +
                  (componentOptions.tag ? `::${componentOptions.tag}` : '')
                : vnode.key
            if (cache[key]) {
              if (vnode.cid === cache[key].cid) {
                vnode.componentInstance = cache[key].componentInstance
                // make current key freshest
                remove(keys, key)
                keys.push(key)
              } else {
                cache[key].componentInstance.$destroy()
                cache[key] = vnode
              }
            } else {
              // delay setting the cache until update
              this.vnodeToCache = vnode
              this.keyToCache = key
            }

            vnode.data.keepAlive = true
          }
          return vnode || (slot && slot[0])
        }
      }

      app.component('keep-alive', KeepAlive)
    }
  }
}
