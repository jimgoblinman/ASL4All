import PropTypes from "prop-types";

import MenuPart from "./menu/main";
import DropdownPart from "./dropdown/main";
import BlockPart from "./block/main";

export function Menu() {
  return <MenuPart />;
}
export function Dropdown({ title, content, isOpen, onToggle }) {
  return (
    <DropdownPart
      title={title}
      content={content}
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
}
export function Block({ content }) {
  return <BlockPart content={content} />;
}

// PropTypes validation
Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

Block.propTypes = {
  content: PropTypes.any.isRequired,
};
