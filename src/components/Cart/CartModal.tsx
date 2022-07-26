import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./CartModal.css";
import { MdClose } from "react-icons/md";
import { IAddCart, ICart, IDeal } from "../../api/interfaces";
import { localGetUserId } from "../../utils/helpers";
import { addToCart } from "../../api/responseHandlers";
// import { FiStar } from "react-icons/fi";
import { getUserCart, updateCart } from "../../api/index";
import Swal from "sweetalert2";

// interface for CartModal
interface CartModalProp {
  item: IDeal | any;
  showCartModal: Boolean;
  setShowCartModal: React.Dispatch<React.SetStateAction<Boolean>>;
  itemInCart: boolean;
  cartData?: any;
  userId: number | null;
}

// styled component for the CartModal
const Background: any = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0;
  transition: all 0.3s ease-in-out;
`;

// component for the CartModal
const CartModal = ({
  item,
  showCartModal,
  setShowCartModal,
  itemInCart,
  cartData,
  userId,
}: CartModalProp) => {
  const [price, setPrice] = useState<Number>(0);
  const [numOfPeople, setNumOfPeople] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const prevPrice =
      cartData && cartData.totalAmount ? cartData.totalAmount : 0;
    setPrice(prevPrice);
  }, [cartData]);

  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // function for checking for the esc key press
  const keyPress = useCallback(
    (e: React.KeyboardEvent | any) => {
      if (e.key === "Escape" && showCartModal) {
        setShowCartModal(false);
      }
    },
    [setShowCartModal, showCartModal]
  );

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showCartModal ? 1 : 0,
    transform: showCartModal ? "translateZ(0)" : "translateZ(-100%)",
    config: {
      // mass: 1,
      // tension: 300,
      // friction: 20,
      duration: 800,
    },
  });

  const handlePeople = (e: any): void => {
    const people = e.target.value;
    setNumOfPeople(Number(people));
    let price = parseInt(people) * item.price;
    setPrice(price);
  };

  const handleDate = (e: any): void => {
    const date = e.target.value;
    setDate(date);
  };

  const handleTime = (e: any): void => {
    const time = e.target.value;
    setTime(time);
  };

  // function for closing the modal
  const closeModal = (e: React.FormEvent): void => {
    e.preventDefault();
    if (modalRef.current === e.target) {
      setShowCartModal(false);
    }
  };

  const handleAddToCart = async (e: React.FormEvent) => {
    if (!userId) {
      Swal.fire({
        title: "Please Login",
        text: `You need to login to ${
          itemInCart ? "update your" : "add to"
        } cart`,
        icon: "warning",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          navigate("/sign-in", {
            replace: true,
            state: { from: location.pathname },
          });
        }
      });
    } else {
      setIsLoading(true);
      if (itemInCart) {
        const formData = {
          userId,
          items: [
            {
              cartId: cartData.id,
              quantity: numOfPeople,
            },
          ],
        };
        const response = await updateCart(formData);
        if (response.data.status === true && response.status === 200) {
          localStorage.setItem("cart_data", JSON.stringify(response.data.data));
          Swal.fire({
            title: "Success!",
            text: "You have successfully updated the item in Cart.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              window.location.reload();
            }
          });
        } else {
          setIsLoading(false);
          setShowCartModal(false);
        }
      } else {
        const formData: IAddCart = {
          userId: localGetUserId(),
          itemId: item.id,
          itemType: item.itemType,
          itemName: item.title,
          currency: item.currency,
          unitPrice: item.price,
          quantity: 2,
          imageUrl: item.imageUrl ? item.imageUrl : item.photos[0].photoUrl,
          date: new Date(),
        };
        const response = await addToCart(formData);
        if (response === true) {
          Swal.fire({
            title: "Success!",
            text: "You have successfully added item to Cart.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              window.location.reload();
            }
          });
        }
      }
    }
  };

  // return the CartModal
  return (
    <>
      <Spin spinning={isLoading}>
        {showCartModal ? (
          // <div className="background">
          <Background onClick={closeModal} ref={modalRef}>
            <animated.div className="modal" style={animation}>
              <div className="cart_modal_wrapper">
                <h3 className="cart_modal_header">
                  ${item.price} <small className="small">/ person</small>
                </h3>
                <div className="cart_select_container">
                  <select name="date" id="date" onClick={handleDate}>
                    <option value="Friday 21st, January">
                      Friday 21st, January
                    </option>
                    <option value="Saturday 22nd, January">
                      Saturday 22nd, January
                    </option>
                    <option value="Sunday 23rd, January">
                      Sunday 23rd, January
                    </option>
                  </select>
                </div>
                <div className="cart_select_container">
                  <select name="people" id="people" onClick={handlePeople}>
                    <option value={itemInCart ? cartData?.quantity : 0}>
                      {itemInCart ? cartData?.quantity : 0} adult
                      {itemInCart && cartData?.quantity > 1 ? "s" : ""}
                    </option>
                    <option value="1">1 adult</option>
                    <option value="2">2 adults</option>
                    <option value="3">3 adults</option>
                    <option value="4">4 adults</option>
                    <option value="5">5 adults</option>
                    <option value="6">6 adults</option>
                    <option value="7">7 adults</option>
                    <option value="8">8 adults</option>
                    <option value="9">9 adults</option>
                    <option value="10">10 adults</option>
                  </select>
                </div>
                <div className="cart_select_container">
                  <select name="time" id="time" onClick={handleTime}>
                    <option value="12:00 - 16:00">12:00 - 16:00</option>
                    <option value="13:00 - 19:00">13:00 - 19:00</option>
                    <option value="11:00 - 13:00">11:00 - 13:00</option>
                  </select>
                </div>
                <div>
                  <button className="button" onClick={handleAddToCart}>
                    Continue
                  </button>
                </div>

                <hr className="cart_line" />

                <div className="price">
                  <p>Total</p>
                  <p>${price.toString()}</p>
                </div>

                <div>
                  <p className="details">
                    No money will be charged at this step. Reserve now and pay
                    later!
                  </p>
                </div>

                <div className="details">
                  <p>
                    <a href="/">Report this activity.</a>
                  </p>
                </div>

                <div>
                  <MdClose
                    className="close_modal_button"
                    onClick={() => setShowCartModal((prev) => !prev)}
                  />
                </div>
              </div>
            </animated.div>
            {/* </div> */}
          </Background>
        ) : null}
      </Spin>
    </>
  );
};

export default CartModal;
