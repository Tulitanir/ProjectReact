import React, { useEffect, useState } from "react";

function ImageComponent({ id }) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    loadImage();
  }, []);

  async function loadImage() {
    try {
      const response = await fetch(`http://localhost:8080/api/image?id=${id}`);
      const arrayBuffer = await response.arrayBuffer();

      const byteArray = new Uint8Array(arrayBuffer);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);

      setImageUrl(url);
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
    }
  }

  return (
    <div>
      <img src={imageUrl} alt="Картинка профиля" />{" "}
    </div>
  );
}

export default ImageComponent;
