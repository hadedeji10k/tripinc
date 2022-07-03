import "./OrderPage.css";
import OrderCard from "./OrderCard";
import { ICart, IOrderItem } from "../../../api/interfaces";

interface Props {
  orderItems: IOrderItem[];
  menuBar: any;
  setMenuBar: any;
}

const OrderPage = ({ orderItems, menuBar, setMenuBar }: Props) => {
  const handleClickMenu = (id: any) => {
    for (let i = 0; i < menuBar.length; i++) {
      const element = menuBar[i];
      element.state = false;
    }
    const index = menuBar.findIndex((item) => item.id === parseInt(id));
    menuBar[index].state = true;
    setMenuBar([...menuBar]);
  };

  return (
    <>
      <div className="cart_container">
        <h3 className="shopping_cart_title">Order View</h3>
        <p className="order_note">Note: Orders are not editable</p>
        {orderItems.length > 0
          ? orderItems.map((item) => (
              <div key={item.id}>
                <OrderCard item={item} />
              </div>
            ))
          : null}
        {/* : (
            <div>
              <br />
              <br />
              <br />
              <p>No item in this order</p>
              <br />
              <br />
              <br />
            </div>
          ) */}

        <button
          onClick={() => handleClickMenu(2)}
          className="customer_info_button"
        >
          Proceed
        </button>
      </div>
    </>
  );
};

export default OrderPage;
