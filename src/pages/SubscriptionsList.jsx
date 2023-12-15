import React, { useState, useEffect } from "react";
import SubscriptionInfo from "../components/SubscriptionInfo";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    fetch("http://backend:8080/api/subscription/getAll")
      .then((response) => response.json())
      .then((res) => {
        setSubscriptions(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h2>Список абонементов</h2>
      {subscriptions.map((subscription) => (
        <SubscriptionInfo key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
};

export default SubscriptionList;
