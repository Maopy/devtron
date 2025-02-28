import AboutPane from './about/pane'
import AccessibilityPane from './accessibility/pane'
import EventListenerPane from './event-listener/pane'
import IPCPane from './ipc/pane'
import LintPane from './lint/pane'

export const Panes = {
  about: AboutPane,
  accessibility: AccessibilityPane,
  'event-listener': EventListenerPane,
  ipc: IPCPane,
  lint: LintPane,
} as const

export type Pane = keyof typeof Panes
