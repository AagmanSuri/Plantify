import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Link from "@mui/material/Link";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import { useLocation, NavLink } from "react-router-dom";
function Humidity() {
  const [db, setDb] = useState([]);
  const [totalInput, setTotalInput] = useState(0);
  const getDb = async () => {
    const response = await fetch(
      "https://api.thingspeak.com/channels/1945231/feeds.json?api_key=Z14F9ZWPU177Z30I&results=10"
    );
    const data = await response.json();
    setDb(data);
  };

  useEffect(() => {
    getDb();
  }, []);

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              {/* <Link
                href={}
                // target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              > */}

              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Humidity"
                  description={"Humidity detected"}
                  date="last detected"
                  chart={{
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    datasets: {
                      label: "Humidity",
                      data: db?.feeds?.map((item) => item.field2)
                    }
                  }}
                />
              </MDBox>

              {/* </Link> */}
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <NavLink key="humidity" to="/humidity">
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="success"
                    title="Humidity"
                    description={
                      // <>
                      //   (<strong>+15%</strong>) increase in today sales.
                      // </>
                      "Humidity detected"
                    }
                    date="last detected"
                    chart={sales}
                  />
                </MDBox>
              </NavLink>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <NavLink key="humidity" to="/humidity">
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title="Soil Moisture"
                    description="Soil Moisture detected"
                    date="last detected"
                    chart={tasks}
                  />
                </MDBox>
              </NavLink>
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
      <Grid>
        <h1>Analysis :-</h1>
        <div>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Average of (10) :{"  "}
          </span>
          <strong>
            {db.feeds &&
              db.feeds
                .map((item) => {
                  return Number(item.field2);
                })
                .reduce((acc, cur) => {
                  var total = Number(acc) + Number(cur) / 10;
                  return total;
                }, 0)}
          </strong>
        </div>
        <div>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Last updated value :{" "}
          </span>
          <strong>{db?.feeds && db?.feeds[9]?.field2}</strong>
        </div>
        <div>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Last updated @ :{" "}
          </span>
          <strong>
            {db.feeds && Date(db?.feeds[9]?.created_at).slice(0, 15)}
            {"  "} , {db.feeds && Date(db?.feeds[9]?.created_at).slice(16, 25)}
          </strong>
        </div>
        <div>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Change from last value :{" "}
          </span>
          <strong>
            {db?.channel && db?.feeds[9]?.field2 - db?.feeds[8]?.field2}
          </strong>
        </div>
      </Grid>
    </DashboardLayout>
  );
}

export default Humidity;
