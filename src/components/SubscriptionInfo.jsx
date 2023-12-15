import React from "react";
import "../style/subscriptionInfo.css";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext";

const SubscriptionInfo = ({ subscription }) => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/loginPage");
      return;
    }

    // handleSelectProduct(subscription);
    navigate("/payment", { state: { subscription } });
  };

  return (
    <div className="subscription-info">
      <p className="subscription-info__text">{subscription.name}</p>
      <p className="subscription-info__text">
        Длительность: {subscription.duration} дней
      </p>
      <p className="subscription-info__text">Цена: {subscription.price}</p>
      <p className="subscription-info__text">
        Скидка:{" "}
        {Math.round(
          (1 - subscription.price / ((1000 * subscription.duration) / 30)) * 100
        )}
        %
      </p>
      <Link
        to={{
          pathname: "/payment",
          search: `?id=${subscription.id}&name=${encodeURIComponent(
            subscription.name
          )}&price=${encodeURIComponent(subscription.price)}`,
        }}
      >
        <button className="subscription-info__button">Купить абонемент</button>
      </Link>
    </div>
  );
};

export default SubscriptionInfo;
