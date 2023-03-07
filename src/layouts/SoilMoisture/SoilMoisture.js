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
function SoilMoisture() {
  const [db, setDb] = useState([]);
  const [localUpdateTime, setlocalUpdateTime] = useState("");

  const getDb = async () => {
    const response = await fetch(
      "https://api.thingspeak.com/channels/2030237/feeds.json?api_key=QLM3JLYV2U7W0PDI&results=10"
    );
    const data = await response.json();
    setDb(data);
  };

  useEffect(() => {
    getDb();
  }, []);

  const getTime = async () => {
    var utcDate = db?.feeds && db?.feeds[9]?.created_at.toString();
    var localDate = new Date(utcDate);
    console.log(localDate.toString());
    setlocalUpdateTime(localDate);
  };

  useEffect(() => {
    getTime();
  }, [db]);

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

              <MDBox mb={1}>
                <ReportsLineChart
                  color="dark"
                  title="Soil Moisture"
                  description="Soil Moisture detected"
                  date="last detected"
                  chart={{
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    datasets: {
                      label: "Soil Moisture",
                      data: db?.feeds?.map((item) => item.field3),
                    },
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
                  return Number(item.field3);
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
          <strong>{db?.feeds && db?.feeds[9]?.field3}</strong>
        </div>
        <div>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Last updated @ :{" "}
          </span>
          <strong>{localUpdateTime.toString().slice(0, 24)}</strong>
        </div>
        <div>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Change from last value :{" "}
          </span>
          <strong>
            {db?.channel && db?.feeds[9]?.field3 - db?.feeds[8]?.field3}
          </strong>
        </div>
      </Grid>
    </DashboardLayout>
  );
}

export default SoilMoisture;
