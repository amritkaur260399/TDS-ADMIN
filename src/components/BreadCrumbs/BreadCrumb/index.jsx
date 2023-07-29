import React from 'react';
import { Link } from 'umi';

const Breadcrumb = ({ path, name, lastElementIndex, index }) => {
  return (
    <span>
      <Link className="text-base text-gray-900" to={path || ''}>
        <span className="flex items-center">
          <span className="text-lg">{/* <Icon component={ZcpIcons.ArrowLeftThick} /> */}</span>
          <span
            className={`inline text-xs font-medium ${
              index === lastElementIndex ? 'text-gray-700' : ''
            }`}
          >
            {name}
          </span>
        </span>
      </Link>
    </span>
  );
};
export default Breadcrumb;
