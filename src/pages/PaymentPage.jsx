import React, { useEffect, useState } from "react";
import Utils from "../utils/Utils";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from "../utils/Auth";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const price = searchParams.get("price");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  let user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/loginPage");
      return;
    }
  }, []);

  const userId = JSON.parse(user).id;

  const handlePayment = async () => {
    if (!Utils.validateCreditCard(cardNumber, expiryDate, cardHolder, cvv)) {
      alert("Данные заполнены неверно");
      return;
    }

    const body = {
      cardNumber: cardNumber,
      cardholderName: cardHolder,
      expirationDate: expiryDate,
      cvc: cvv,
      subscriptionId: id,
      memberId: userId,
    };

    const request = await Authentication.fetchWithAuth(
      `http://backend:8080/api/subscription/buySubscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!request) {
      localStorage.clear();
      navigate("/loginPage");
    }
    try {
      const response = await fetch(request.url, request.options);
      if (response.status !== 200) {
        throw new Error(await response.text());
      }
    } catch (error) {
      alert(error);
    }

    navigate("/loginPage");
  };

  return (
    <div>
      <h2>Оплата абонемента</h2>
      <div>
        <p>Выбранный абонемент: {name}</p>
        <p>Цена: {price}</p>
        <label>
          Имя и фамилия владельца карты:
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="USER USEROVICH"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Номер карты:
          <input
            type="text"
            value={cardNumber}
            placeholder="1234567891234567"
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Срок действия:
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="06/23"
            required
          />
        </label>
      </div>
      <div>
        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
          />
        </label>
      </div>
      <button onClick={handlePayment}>Оплатить</button>
    </div>
  );
};

export default PaymentPage;
