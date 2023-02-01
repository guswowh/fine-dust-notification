/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from 'react';
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
  const liElement = useRef<HTMLUListElement>(null);
  const [dropDownListLength, setDropDownListLength] = useState<number>();
  const userChangeCityHandler = () => {
    setDropDownVisibility(!dropDownVisibility);
    if (dropDownVisibility) {
      setIsDropDwon(false);
    } else {
      setIsDropDwon(true);
    }
  };
  const userSelectStation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { textContent } = e.target as HTMLButtonElement;
    setCityName(textContent as string);
    setDropDownVisibility(!dropDownVisibility);
    setIsDropDwon(false);
  };

  useEffect(() => {
    if (liElement.current?.offsetHeight! > liElement.current?.offsetWidth!) {
      setDropDownListLength(liElement.current?.offsetWidth);
    }
  }, [dropDownVisibility, dropDownListLength]);

  return (
    <S.Wrapper isDropDwon={isDropDwon}>
      <ul>
        <li>
          <button
            className="cityName"
            type="button"
            onClick={userChangeCityHandler}
          >
            <span>{cityName}</span>
            {isDropDwon ? <DropDownUiOnIcon /> : <DropDownUiOffIcon />}
          </button>
        </li>
        <li>
          <DropDownList visibility={dropDownVisibility}>
            <S.DropdownContainer dropDownListLength={dropDownListLength}>
              <ul ref={liElement}>
                {itemList?.map((item) => (
                  <li key={item}>
                    <button type="button" onClick={userSelectStation}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </S.DropdownContainer>
          </DropDownList>
        </li>
      </ul>
    </S.Wrapper>
  );
}

export default Dropdown;
