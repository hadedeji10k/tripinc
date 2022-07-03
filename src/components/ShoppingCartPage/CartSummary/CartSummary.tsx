import Swal from "sweetalert2";
import { makeOrder } from "../../../api/responseHandlers";
import "./CartSummary.css";
interface Props {
  totalAmountOfItems: number;
  itemsInCart: boolean;
  setIsLoading: any;
  userId: any;
}
const CartSummary = ({
  totalAmountOfItems,
  itemsInCart,
  setIsLoading,
  userId,
}: Props) => {
  const serviceFee = itemsInCart ? 200 : 0;

  const handleOrderClick = async () => {
    setIsLoading(true);
    const formData = {
      userId,
    };
    Swal.fire({
      title:
        "Are you sure you want to place an order now? Note: Orders cannot be edited.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, continue!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          // remove from database
          await makeOrder(formData).then((res) => {
            setIsLoading(false);
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="cart_summary_container">
        <p className="shopping_description">Cart Summary</p>

        <hr className="cart_line" />
        <div className="shopping_cart_price">
          <div className="shopping_price">
            <p>Subtotal</p>
            <p>${totalAmountOfItems}</p>
          </div>
          <div className="shopping_price">
            <p>Service fee</p>
            <p>${serviceFee}</p>
          </div>
          <div className="total_shopping_price">
            <p>Total</p>
            <p>${serviceFee + totalAmountOfItems}</p>
          </div>
        </div>

        <hr className="cart_line" />
        <p>Have a Voucher?</p>
        <input
          type="text"
          className="shopping_input"
          placeholder="Enter your voucher code here"
        />

        <hr className="cart_line" />
        <button
          onClick={handleOrderClick}
          className="shopping_cart_button_to_checkout"
        >
          Checkout to Order
        </button>
      </div>
    </>
  );
};

export default CartSummary;
