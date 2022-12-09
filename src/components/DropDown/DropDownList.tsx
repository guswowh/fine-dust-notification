import React from 'react';
import * as S from './style';

interface ListProps {
  visibility: boolean;
  children: React.ReactNode;
}

function DropDownList({ visibility, children }: ListProps) {
  return <S.DropdownContainer>{visibility && children}</S.DropdownContainer>;
}

export default DropDownList;
