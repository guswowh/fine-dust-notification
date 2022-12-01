import React from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.article`
  position: relative;
`;
interface Props {
  visibility: any;
  children: any;
}

function Dropdown({ visibility, children }: Props) {
  return <DropdownContainer>{visibility && children}</DropdownContainer>;
}

export default Dropdown;
