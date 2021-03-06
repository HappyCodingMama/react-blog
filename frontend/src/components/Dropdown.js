import React, { useState } from 'react';
import { serviceDropdown } from './DropdownItems';
import { Link } from 'react-router-dom';
import './dropdown.css';

const Dropdown = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <ul
      className={dropdown ? 'services-submenu-active' : 'services-submenu'}
      onClick={() => setDropdown(!dropdown)}
    >
      {serviceDropdown.map((item) => {
        return (
          <li key={item.id}>
            <Link
              to={item.path}
              className={item.cName}
              onClick={() => setDropdown(false)}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Dropdown;
