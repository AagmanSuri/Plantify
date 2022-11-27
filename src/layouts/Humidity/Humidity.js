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
    </DashboardLayout>
  );
}

export default Humidity;
