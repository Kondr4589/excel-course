import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners,)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.store = options.store

    this.prepare()
  }

  // Настраиваем наш компонент до init
  prepare() {

  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Приходят только изменения по полям на которые подписались
  storeChanged() {
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }
  // Инициализируем компонент
  init() {
    this.initDOMListeners()
  }

  // Удалаяем компонент
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
