import React, { useState, Dispatch, SetStateAction } from 'react';
import { DropDownUiOffIcon, DropDownUiOnIcon } from '../icons';
import DropDownList from './DropDownList';
import * as S from './style';

interface Props {
  cityName: string;
  setCityName: Dispatch<SetStateAction<string>>;
  itemList: string[];
}

function Dropdown({ cityName, setCityName, itemList }: Props) {
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const [isDropDwon, setIsDropDwon] = useState(false);
  const userChangeCityHandler = () => {
    setDropDownVisibility(!dropDownVisibility);
    setIsDropDwon(!isDropDwon);
  };
  const userSelectStation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { textContent } = e.target as HTMLButtonElement;
    setCityName(textContent as string);
    setDropDownVisibility(!dropDownVisibility);
  };

  return (
    <S.Wrapper isDropDwon={isDropDwon}>
      <ul>
        <li>
          <button
            className="cityName"
            type="button"
            onClick={userChangeCityHandler}
          >
            {cityName}
            {isDropDwon ? <DropDownUiOnIcon /> : <DropDownUiOffIcon />}
          </button>
        </li>
        <li>
          <DropDownList visibility={dropDownVisibility}>
            <ul>
              {itemList?.map((item) => (
                <li key={item}>
                  <button type="button" onClick={userSelectStation}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </DropDownList>
        </li>
      </ul>
    </S.Wrapper>
  );
}

export default Dropdown;
