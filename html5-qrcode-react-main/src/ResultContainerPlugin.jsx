import React from "react";

function filterResults(results) {
  let filteredResults = [];
  for (var i = 0; i < results.length; ++i) {
    if (i === 0) {
      filteredResults.push(results[i]);
      continue;
    }

    if (results[i].decodedText !== results[i - 1].decodedText) {
      filteredResults.push(results[i]);
    }
  }
  return filteredResults;
}

const ResultContainer = (results) => {
  return (
    <div>

            {results.data[0] === undefined ? (
              <div>
              </div>
            ) : results.data[0] === "ABC-abc-1234" ? (
              <div class="alert alert-success" role="alert">
                Produto comercializado pela DL.
              </div>
            ) : (
              <div class="alert alert-danger" role="alert">
                Produto não comercializado pela DL.
              </div>
            )}
          
    </div>
  );
};

const ResultContainerPlugin = (props) => {
  const results = filterResults(props.results);
  return (
    <div className="Result-container">
      <div className="Result-section">
        <ResultContainer data={results} />
      </div>
    </div>
  );
};

export default ResultContainerPlugin;
