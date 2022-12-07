import React, { useState, Dispatch, SetStateAction } from 'react';
import DropDownList from './DropDownList';

interface Props {
  cityName: string;
  setCityName: Dispatch<SetStateAction<string>>;
  itemList: string[];
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
        <DropDownList visibility={dropDownVisibility}>
          {itemList?.map((item) => (
            <li key={item}>
              <button type="button" onClick={userSelectStation}>
                {item}
              </button>
            </li>
          ))}
        </DropDownList>
      </li>
    </ul>
  );
}

export default Dropdown;
