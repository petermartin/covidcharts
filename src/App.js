import React from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { Line, Bar } from "react-chartjs-2";

function diff(ary) {
  var newA = [0];
  for (var i = 1; i < ary.length; i++) newA.push(ary[i] - ary[i - 1]);
  return newA;
}

const colors = {
  white: "hsl(0, 0%, 100%)",
  black: "hsl(0, 0%, 4%)",
  light: "hsl(0, 0%, 96%)",
  dark: "hsl(0, 0%, 21%)",
  primary: "hsl(171, 100%, 41%)",
  link: "hsl(217, 71%, 53%)",
  info: "hsl(204, 86%, 53%)",
  success: "hsl(141, 53%, 53%)",
  warning: "hsl(48, 100%, 67%)",
  danger: "hsl(348, 100%, 61%)"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get("https://covidtracking.com/api/states/daily?state=MA")
      .then(response => {
        const data = response.data ? _.reverse(response.data) : [];
        this.setState({ data });
      });
  }

  render() {
    const { data } = this.state;
    const labels = data.map(i => {
      return moment(i.date, "YYYYMMDD").format("M/D");
    });

    return (
      <div>
        <section className="hero is-medium is-info">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">Massachusetts Coronavirus Tracker</h1>
              <p className="subtitle is-4">
                Data sourced from{" "}
                <a href="https://covidtracking.com/data/state/massachusetts/">
                  The COVID Tracking Project
                </a>
              </p>
            </div>
          </div>
        </section>{" "}
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column ">
                <div className="box">
                  <h2 className="title">Daily Case Tracking</h2>
                  <Line

                    data={{
                      labels,
                      datasets: [
                        {
                          label: "Positive Cases",
                          fill: false,
                          lineTension: 0.1,
                          backgroundColor: "rgba(75,192,192,0.4)",
                          borderColor: colors.primary,
                          borderCapStyle: "butt",
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          pointBorderColor: colors.primary,
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: colors.primary,
                          pointHoverBorderColor: colors.primary,
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                          data: _.map(data, "positive")
                        },
                        {
                          label: "Deaths",
                          fill: false,
                          lineTension: 0.1,
                          backgroundColor: colors.danger,
                          borderColor: colors.danger,
                          borderCapStyle: "butt",
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          pointBorderColor: colors.danger,
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: "rgba(75,192,192,1)",
                          pointHoverBorderColor: "rgba(220,220,220,1)",
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                          data: _.map(data, "death")
                        },
                        {
                          label: "Hospitalizations",
                          fill: false,
                          lineTension: 0.5,
                          backgroundColor: colors.warning,
                          borderColor: colors.warning,
                          borderCapStyle: "butt",
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          pointBorderColor: colors.warning,
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: "rgba(75,192,192,1)",
                          pointHoverBorderColor: "rgba(220,220,220,1)",
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                          data: _.map(data, "hospitalized")
                        }
                      ]
                    }}
                  />
                </div>
              </div>
              <div className="column">
                <div className="box">
                  <h2 className="title">Daily Test Totals</h2>
                  <Bar
                  options={{
                    scales: {
                      xAxes: [
                        {
                          stacked: true
                        }
                      ],
                      yAxes: [
                        {
                          stacked: false
                        }
                      ]
                    }
                  }}
                    data={{
                      labels,
                      datasets: [
                        {
                          label: "Daily Increase",
                          fill: false,
                          lineTension: 0.1,
                          backgroundColor: colors.success,
                          borderColor: colors.success,
                          borderCapStyle: "butt",
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          pointBorderColor: colors.success,
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: colors.primary,
                          pointHoverBorderColor: colors.primary,
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                          data: diff(_.map(data, "total"))
                        },
                        {
                          label: "Total Tests",
                          fill: false,
                          lineTension: 0.1,
                          backgroundColor: colors.info,
                          borderColor: colors.success,
                          borderCapStyle: "butt",
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          pointBorderColor: colors.success,
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: colors.primary,
                          pointHoverBorderColor: colors.primary,
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                          data: _.map(data, "total")
                        }
                      ]
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
