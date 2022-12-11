import React from 'react';

interface ListProps {
  visibility: boolean;
  children: React.ReactNode;
}

function DropDownList({ visibility, children }: ListProps) {
  return <div>{visibility && children}</div>;
}

export default DropDownList;
