import React from 'react';
import styled from 'styled-components';

interface ListProps {
  visibility: boolean;
  children: React.ReactNode;
}

function DropDownList({ visibility, children }: ListProps) {
  const DropdownContainer = styled.article`
    position: relative;
  `;
  return <DropdownContainer>{visibility && children}</DropdownContainer>;
}

export default DropDownList;
