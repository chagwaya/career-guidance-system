import '@testing-library/jest-dom/vitest'

// -- Polyfills required by Radix UI primitives in jsdom --

// ResizeObserver (used by Select, Dialog, Popover, etc.)
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver

// window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// scrollIntoView (used by Radix Select / Combobox)
Element.prototype.scrollIntoView = () => {}

// PointerEvent (jsdom doesn't ship one)
class PointerEventStub extends Event {
  readonly button: number
  readonly ctrlKey: boolean
  readonly pointerType: string
  constructor(type: string, props: PointerEventInit & EventInit = {}) {
    super(type, props)
    this.button = props.button ?? 0
    this.ctrlKey = props.ctrlKey ?? false
    this.pointerType = props.pointerType ?? 'mouse'
  }
}
window.PointerEvent = PointerEventStub as unknown as typeof PointerEvent

// Pointer-capture methods (used by Radix pointerdown handlers)
Element.prototype.hasPointerCapture = () => false
Element.prototype.setPointerCapture = () => {}
Element.prototype.releasePointerCapture = () => {}
