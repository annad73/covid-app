import { useState } from "react";
import axios from "axios";

import Input from "../components/Input";
export default function Home() {
  const [locState, setLocState] = useState("VA");
  const [covidData, setCovidData] = useState(null);
  /**
   *
   *
   * Fetch the covid data returned
   */
  const stateOptions = {
    None: "Select a State",
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };

  const arrOfStates = Object.keys(stateOptions);

  const getCovidData = (locState) => {
    setLocState(locState);

    const options = {
      method: "GET",
      url: "http://localhost:3000/api/covid",
      params: { locState },
    };
    axios
      .request(options)
      .then(function (response) {
        const { data } = response;
        setCovidData(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-raleway font-bold text-6xl text-primary pt-20 pb-6 md:text-3xl">
        <span className="text-danger">COVID Dashboard</span> App
      </h2>
      <p>
        <select
          name="states"
          onChange={(e) => getCovidData(e.target.value)}
          className="px-4 py-2 rounded border-2"
        >
          {arrOfStates.map((s) => (
            <option value={s} key={s}>
              {stateOptions[s]}
            </option>
          ))}
        </select>
      </p>
      <hr />
      <br />
      {covidData && (
        <div name="Results">
          <p className="font-raleway font-bold text-lg tracking-wider md:text-base">
            <span className="text-danger">
              <b>{stateOptions[covidData.state]} Data</b>
              <br />
              Positivity Rate:{" "}
              {`${
                Math.round(covidData.metrics.testPositivityRatio * 100 * 10) /
                10
              } `}
              %
              <br />
              Covid Cases: {covidData.actuals.cases.toLocaleString()} <br />
              Deaths: {covidData.actuals.deaths.toLocaleString()} <br />
              <font color="Red">Hospital Utilization</font>
              <br />
              Hospital Beds:{" "}
              {covidData.actuals.hospitalBeds.currentUsageTotal.toLocaleString()}{" "}
              (
              {Math.round(
                (covidData.actuals.hospitalBeds.currentUsageTotal /
                  covidData.actuals.hospitalBeds.capacity) *
                  100 *
                  10
              ) / 10}
              % capacity)
              <br />
              Covid Beds:{" "}
              {covidData.actuals.hospitalBeds.currentUsageCovid.toLocaleString()}{" "}
              (
              {Math.round(
                (covidData.actuals.hospitalBeds.currentUsageCovid /
                  covidData.actuals.hospitalBeds.capacity) *
                  100 *
                  10
              ) / 10}
              % capacity)
              <br />
              ICU Beds:{" "}
              {covidData.actuals.icuBeds.currentUsageTotal.toLocaleString()} (
              {Math.round(
                (covidData.actuals.icuBeds.currentUsageTotal /
                  covidData.actuals.icuBeds.capacity) *
                  100 *
                  10
              ) / 10}
              % capacity)
              <br />
              Covid ICU Beds:{" "}
              {covidData.actuals.icuBeds.currentUsageCovid.toLocaleString()} (
              {Math.round(
                (covidData.actuals.icuBeds.currentUsageCovid /
                  covidData.actuals.icuBeds.capacity) *
                  100 *
                  10
              ) / 10}
              % capacity)
              <br />
            </span>
          </p>
          <p>
            <font color="Black"> As of: {covidData.lastUpdatedDate}</font>
          </p>
        </div>
      )}
    </div>
  );
}
