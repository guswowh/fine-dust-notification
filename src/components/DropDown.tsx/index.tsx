import React from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.article`
  position: relative;
`;
interface Props {
  visibility: boolean;
  children: React.ReactNode;
}

function Dropdown({ visibility, children }: Props) {
  return <DropdownContainer>{visibility && children}</DropdownContainer>;
}

export default Dropdown;
