import PropTypes from "prop-types";

import MenuPart from "./menu/main";
import DropdownPart from "./dropdown/main";
import BlockPart from "./block/main";

export function Menu() {
  return <MenuPart />;
}
export function Dropdown({ title, content }) {
  return <DropdownPart title={title} content={content} />;
}
export function Block({ content }) {
  return <BlockPart content={content} />;
}

// PropTypes validation
Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
};

Block.propTypes = {
  content: PropTypes.any.isRequired,
};
