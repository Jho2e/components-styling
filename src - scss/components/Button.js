import React from "react";
import classNames from "classnames";
import "./Button.scss";

function Button({
  //   onClick,
  //   onMouseMove,
  // 필요한 이벤트가 있을 때 마다 매번 이렇게 넣어주는건 귀찮습니다.
  // 이러한 문제를 해결 해줄 수 있는 문법이 바로 spread 와 rest 입니다.
  // 이 문법은 주로 배열과 객체, 함수의 파라미터, 인자를 다룰 때
  // 사용하는데, 컴포넌트에서도 사용 할 수 있답니다.

  children,
  size,
  color,
  outline,
  fullWidth,
  ...rest
}) {
  return (
    <button
      className={classNames("Button", size, color, { outline, fullWidth })}
      {...rest}
      // 이렇게 ...rest를 사용해서
      // 우리가 지정한 props 를 제외한 값들을 rest 라는 객체에 모아주고,
      // <button> 태그에 {...rest} 를 해주면,
      // rest 안에 있는 객체안에 있는 값들을 모두
      // <button> 태그에 설정을 해준답니다.
    >
      {children}
    </button>
  );
}

// 조건부로 CSS 클래스를 넣어주고 싶을때
// 문자열을 직접 조합해주는 것 보다
// classnames 라는 라이브러리를 사용하는 것이 훨씬 편합니다.
Button.defaultProps = {
  size: "medium",
  color: "blue",
};

export default Button;
