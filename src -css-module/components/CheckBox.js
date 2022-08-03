import React from "react";

// yarn add react-icons
// 이 라이브러리를 사용하면
// Font Awesome, Ionicons, Material Design Icons, 등의 아이콘들을
// 컴포넌트 형태로 쉽게 사용 할 수 있다.
// https://react-icons.github.io/react-icons/#/
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styles from "./CheckBox.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function CheckBox({ children, checked, ...rest }) {
  return (
    <div className={cx("checkbox")}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={cx("icon")}>
          {checked ? (
            <MdCheckBox className={cx("checked")} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;
