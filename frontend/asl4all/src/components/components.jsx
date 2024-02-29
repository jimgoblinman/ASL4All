import MenuPart from './menu/main'
import DropdownPart from './dropdown/main'
import BlockPart from './block/main'

export function Menu() { return <MenuPart />  }
export function Dropdown(title) { return <DropdownPart title={title.title}/> }
export function Block(content) { return <BlockPart content={content.content}/> }