import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce(
    (currentNumber, item) => {
      return currentNumber + item.amount;
    }, 0);
  
  const btnStyles = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}` ;

  useEffect(() => {
    if (items.length === 0){
      return;
    }
    const timer = setBtnIsHighlighted(true);
    setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  }, [items])  

  return (
    <button className={btnStyles} onClick={props.onClick}>
      <span className={styles.icon}>
          <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>
          {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCartButton;
