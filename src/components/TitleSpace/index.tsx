import React from 'react';
import * as S from './style';

interface Props {
  title: string;
  userName: string | undefined;
}

function TitleSpace({ title, userName }: Props) {
  return (
    <S.Wrapper>
      <div className="titleSpace">
        <div>
          <p className="userName">{userName}</p>
          <h3 className="title">{title}</h3>
        </div>
      </div>
    </S.Wrapper>
  );
}

export default React.memo(TitleSpace);
