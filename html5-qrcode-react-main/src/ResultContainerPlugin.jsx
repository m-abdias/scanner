import React, { useEffect, useState } from "react";
import axios from "axios";

function ResultContainerPlugin(props) {
  const [dbConsult, setDbConsult] = useState({
    data: {
      IMEI1: "",
      IMEI2: "",
      SERIAL_NUMBER: "",
      NAME: "",
      TYPE: "",
    },
    message: "",
  });

  function consultDB(imeiSerial) {
    const baseURL =
      process.env.REACT_APP_BASE_ENDPOINT_CHECKMI +
      "/product/fromsite/" +
      imeiSerial.results[0];

    axios
      .get(baseURL, {
        headers: {
          "API-KEY": process.env.REACT_APP_API_TOKEN,
        },
      })
      .then((response) => {
        if (
          imeiSerial.results[0] !== undefined &&
          response.data !== null &&
          response.data !== undefined &&
          Object.keys(response.data).length > 0
        ) {
          console.log(imeiSerial.results[0])
          setDbConsult(response.data);
        } else {
          this.responseMessage(
            "Erro no retorno da" + "requisição. Tente novamente"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        switch (err.response.data.statusCode) {
          case 401:
            console.log(" ___________________________ ");
            console.log("|      NÃO AUTORIZADO.      |");
            console.log("|      TENTE NOVAMENTE      |");
            console.log("|---------------------------|");
            console.log("|     STATUS_ERROR: 401     |");
            console.log("|      ConsultIMEI.tsx      |");
            console.log(" ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ ");
            this.responseMessage("Não autorizado." + "Tente novamente.");
            break;
          case 429:
            console.log(" ___________________________ ");
            console.log("|  EXCESSO DE REQUISIÇÕES,  |");
            console.log("|  AGUARDE PARA CONTINUAR.  |");
            console.log("|---------------------------|");
            console.log("|     STATUS_ERROR: 429     |");
            console.log("|      ConsultIMEI.tsx      |");
            console.log(" ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ ");
            this.responseMessage(
              "Excesso de requisições," + " aguarde para continuar."
            );
            break;
          case 500:
            console.log(" ___________________________ ");
            console.log("|   SERVIDOR INDISPONÍVEL   |");
            console.log("|     OU EM MANUTENÇÃO.     |");
            console.log("|---------------------------|");
            console.log("|     STATUS_ERROR: 429     |");
            console.log("|      ConsultIMEI.tsx      |");
            console.log(" ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ ");
            this.responseMessage("Servidor indisponível" + "ou em manutenção.");
            break;
        }
      });
  }

  useEffect(() => {
    consultDB(props);
  }, []);

  if (dbConsult["data"]["SERIAL_NUMBER"] === "") {
    return null;
  }

    return (
      <div>
        {dbConsult["data"]["SERIAL_NUMBER"] > "" ? (
          <div className="Barcoder-Result">
            {dbConsult["data"]["SERIAL_NUMBER"] === undefined ||
            dbConsult["data"]["SERIAL_NUMBER"] === "" ||
            dbConsult["data"]["SERIAL_NUMBER"] === null ? (
              <div></div>
            ) : (
              <div>
                <h1>Serial: {dbConsult["data"]["SERIAL_NUMBER"]}</h1>
                <div class="alert alert-success" role="alert">
                  {dbConsult["message"]}
                  <br />
                  {dbConsult["data"]["NAME"]}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="Barcoder-Result">
            <h1>Serial: {props.results[0]}</h1>
            <div class="alert alert-danger" role="alert">
              {dbConsult["message"]}
            </div>
          </div>
        )}
      </div>
    );

}

export default ResultContainerPlugin;
