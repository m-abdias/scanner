import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

function ResultContainerPlugin(props) {
  const [loading, setLoading] = useState(false);
  const [dbConsult, setDbConsult] = useState({
    SERIAL_NUMBER: "",
    NAME: "",
    message: "",
  });

  async function consultDB(imeiSerial) {
    try {
      setLoading(true);
      const baseURL = `${process.env.REACT_APP_BASE_ENDPOINT_CHECKMI}/product/fromsite/${imeiSerial.results[0]}`;

      const response = await axios.get(baseURL, {
        headers: {
          "API-KEY": process.env.REACT_APP_API_TOKEN,
        },
      });
      if (
        response.data !== null &&
        response.data !== undefined &&
        Object.keys(response.data).length > 0
      ) {
        setDbConsult({
          SERIAL_NUMBER: response.data.data.SERIAL_NUMBER || "",
          NAME: response.data.data.NAME || "",
          message: response.data.message,
        });
      }
    } catch (error) {
      this.responseMessage(
        `Erro no retorno da requisição. Tente novamente, ${error}`
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (props.results[0] !== undefined) consultDB(props);
  }, [props]);

  return (
    <div>
      <BeatLoader color="#000000" loading={loading} css="" />
      {dbConsult.SERIAL_NUMBER !== "" && !loading ? (
        <div className="Barcoder-Result">
          <h1>Serial: {dbConsult.SERIAL_NUMBER}</h1>
          <div class="alert alert-success" role="alert">
            {dbConsult.message}
            <br />
            {dbConsult.NAME}
          </div>
        </div>
      ) : dbConsult.message !== "" && !loading ? (
        <div className="Barcoder-Result">
          <h1>Serial: {props.results[0]}</h1>
          <div class="alert alert-danger" role="alert">
            {dbConsult.message}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ResultContainerPlugin;
