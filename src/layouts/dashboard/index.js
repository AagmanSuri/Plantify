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

function Dashboard() {
  // const [data, setData] = useState([]);
  // const [tempField, setTempField] = useState([]);
  // const [createdAt, setCreatedAt] = useState([]);
  // useEffect(() => {
  //   fetch(
  //     "https://api.thingspeak.com/channels/1945231/feeds.json?api_key=Z14F9ZWPU177Z30I&results=10"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  //   // .then(() => {
  //   //   // const tempFieldinput1 = data?.feeds?.map((item) => {
  //   //   //   return item?.field1;
  //   //   // });
  //   //   // const createdAtInput = data?.feeds?.map((item) => {
  //   //   //   return item?.created_at;
  //   //   // });
  //   //   setTempField(
  //   //     data?.feeds?.map((item) => {
  //   //       return item?.field1;
  //   //     })
  //   //   );
  //   //   setCreatedAt(
  //   //     data?.feeds?.map((item) => {
  //   //       return item?.created_at;
  //   //     })
  //   //   );
  //   // });
  // }, [data]);

  // const tempFieldinput1 = data?.feeds?.map((item) => {
  //   return item?.field1;
  // });
  // const createdAtInput = data?.feeds?.map((item) => {
  //   return item?.created_at;
  // });

  // useEffect(() => {
  //   setTempField(
  //     data?.feeds?.map((item) => {
  //       return item?.field1;
  //     })
  //   );
  //   setCreatedAt(
  //     data?.feeds?.map((item) => {
  //       return item?.created_at;
  //     })
  //   );
  // }, []);

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

  console.log(db);
  const { sales, tasks } = reportsLineChartData;

  const [TemperatueField, setTemperatueField] = useState(2);

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="leaderboard"
                title="Total Entries"
                count={281}
                percentage={{
                  // color: "success",
                  // amount: "+55%",
                  label: "Total feed entries"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Temperature"
                count={TemperatueField + "°c"}
                percentage={{
                  // color: "success",
                  // amount: "+3%",
                  label: "Last detected temperature"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="leaderboard"
                title="Humidity"
                count="34"
                percentage={{
                  // color: "success",
                  // amount: "+1%",
                  label: "Last detected humidity"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="leaderboard"
                title="Soil Moisture"
                count="91"
                percentage={{
                  // color: "success",
                  // amount: "",
                  label: "Last detected Soil Moisture"
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              {/* <Link
                href={}
                // target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              > */}
              <NavLink key="temperature" to="/temperature">
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="info"
                    title="Temperature"
                    description="Temperature detected"
                    date="last detected"
                    chart={{
                      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                      datasets: {
                        label: "Temperature",
                        data: db?.feeds?.map((item) => item.field1)
                      }
                    }}
                  />
                </MDBox>
              </NavLink>
              {/* </Link> */}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <NavLink key="humidity" to="/humidity">
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
              </NavLink>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <NavLink key="humidity" to="/humidity">
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title="Soil Moisture"
                    description="Soil Moisture detected"
                    date="last detected"
                    chart={{
                      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                      datasets: {
                        label: "Soil Moisture",
                        data: db?.feeds?.map((item) => item.field3)
                      }
                    }}
                  />
                </MDBox>
              </NavLink>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {/* <Projects /> */}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/* <OrdersOverview /> */}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}

      {/* {console.log(tempField)} */}
    </DashboardLayout>
  );
}

export default Dashboard;
