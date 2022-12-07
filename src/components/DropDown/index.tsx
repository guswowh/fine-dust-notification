import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.article`
  position: relative;
`;

interface Props {
  cityName: string;
  setCityName: Dispatch<SetStateAction<string>>;
  itemList: string[];
}

interface ListProps {
  visibility: boolean;
  children: React.ReactNode;
}

function DropdownList({ visibility, children }: ListProps) {
  return <DropdownContainer>{visibility && children}</DropdownContainer>;
}

function Dropdown({ cityName, setCityName, itemList }: Props) {
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const userChangeCityHandler = () => {
    setDropDownVisibility(!dropDownVisibility);
  };
  const userSelectStation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { textContent } = e.target as HTMLButtonElement;
    setCityName(textContent as string);
    setDropDownVisibility(!dropDownVisibility);
  };

  return (
    <ul>
      <li>
        <button type="button" onClick={userChangeCityHandler}>
          {cityName}
        </button>
      </li>
      <li>
        <DropdownList visibility={dropDownVisibility}>
          {itemList?.map((item) => (
            <li key={item}>
              <button type="button" onClick={userSelectStation}>
                {item}
              </button>
            </li>
          ))}
        </DropdownList>
      </li>
    </ul>
  );
}

export default Dropdown;
