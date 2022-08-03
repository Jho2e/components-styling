import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Button from "./Button";

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

// Button 덮어쓰는 방법
const ShortMarginButton = styled(Button)`
  :not(:first-child) {
    margin-left: 0.5rem;
  }
`;

function Dialog({
  title,
  Children,
  cancelText,
  confirmText,
  onConfirm,
  onCancel,
  visible,
}) {
  /* 사라지는 효과를 구현하려면 Dialog 컴포넌트에서 
  두개의 로컬 상태를 관리해주어야 합니다. 
  하나는 현재 트랜지션 효과를 보여주고 있는 중이라는 상태를 의미하는 animate, 
  나머지 하나는 실제로 컴포넌트가 사라지는 시점을 지연시키기 위한 localVisible 값입니다.

  그리고 useEffect 를 하나 작성해주어야 하는데요, 
  visible 값이 true 에서 false 로 바뀌는 시점을 감지하여 
  animate 값을 true 로 바꿔주고 
  setTimeout 함수를 사용하여 250ms 이후 false로 바꾸어 주어야 합니다.
  
  추가적으로, !visible 조건에서 null 를 반환하는 대신에 
  !animate && !localVisible 조건에서 null 을 반환하도록 수정해주어야 합니다.
 */
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;
  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
        <h3>{title}</h3>
        <p>{Children}</p>
        <ButtonGroup>
          {/* 취소 */}
          <ShortMarginButton color="blue" onClick={onCancel}>
            {cancelText}
          </ShortMarginButton>
          {/* 삭제 */}
          <ShortMarginButton color="pink" onClick={onConfirm}>
            {confirmText}
          </ShortMarginButton>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  confirmText: "확인",
  cancelText: "취소",
};

export default Dialog;
