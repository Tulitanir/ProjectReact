import { useEffect, useState } from "react";
import Training from "./Training";

function MemberTraining({ id }) {
  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    fetch(`http://backend:8080/api/program/getTrainingsByMemberId?id=${id}`)
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

export default MemberTraining;
