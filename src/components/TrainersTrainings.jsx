import { useEffect, useState } from "react";
import Training from "./Training";

function TrainersTraining({ id }) {
  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/program/getTrainingsByTrainerId?id=${id}`)
      .then((response) => response.json())
      .then((res) => {
        setTrainings(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <div className="container">
        <section>
          <div style={{ marginTop: "3rem" }}>
            {trainings.map((t) => (
              <Training
                key={t.id}
                id={t.id}
                beginning={t.beg}
                end={t.ending}
                date={t.date}
                title={t.title}
                setTrainings
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default TrainersTraining;
