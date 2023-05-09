import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

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
  const [db, setDb] = useState([]);
  const [localUpdateTime, setlocalUpdateTime] = useState("");
  const [file, setFile] = useState();
  const [result, setResult] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  //Code for disease detection
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isLoading: false,
  //     hasImage: false,
  //     imageUrl: "",
  //     fileUrl: "",
  //     file: null,
  //     result: "",
  //   };
  // }

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(value + " AND " + name);
    console.log(event.target.files[0]);
    //var hasImage = hasImage;
    setHasImage(value !== "");
    setFileUrl(...fileUrl, URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handlePredictClick = (event) => {
    //const file = file;
    //setFile(file,file);
    console.log(file);
    const data = new FormData();
    console.log(data);
    data.append("file", file);
    setIsLoading(true);

    fetch("http://127.0.0.1:5000/prediction/", {
      //mode: "no-cors",
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setResult(response.result);
        setIsLoading(false);
      });
  };

  const handleCancelClick = (event) => {
    setFile(null);
    setResult("");
    setHasImage(false);
    setFileUrl("");
  };

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

  console.log(db);

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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="leaderboard"
                title="Total Entries"
                count={db && db?.channel?.last_entry_id}
                percentage={{
                  // color: "success",
                  // amount: "+55%",
                  //       label: `${
                  //         db.feeds && Date(db?.feeds[9]?.created_at).slice(0, 15)
                  //       },
                  //  ${db.feeds && Date(db?.feeds[9]?.created_at).slice(16, 25)}`
                  label: localUpdateTime.toString().slice(0, 24),
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Temperature"
                count={db.feeds && db?.feeds[9]?.field1 + "°c"}
                percentage={{
                  // color: "success",
                  // amount: "+3%",
                  label: "Last detected temperature",
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
                count={db.feeds && db?.feeds[9]?.field2}
                percentage={{
                  // color: "success",
                  // amount: "+1%",
                  label: "Last detected humidity",
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
                count={db.feeds && db?.feeds[9]?.field3}
                percentage={{
                  // color: "success",
                  // amount: "",
                  label: "Last detected Soil Moisture",
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
                    date={localUpdateTime.toString().slice(0, 24)}
                    chart={{
                      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                      datasets: {
                        label: "Temperature",
                        data: db?.feeds?.map((item) => item.field1),
                      },
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
                    date={localUpdateTime.toString().slice(0, 24)}
                    chart={{
                      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                      datasets: {
                        label: "Humidity",
                        data: db?.feeds?.map((item) => item.field2),
                      },
                    }}
                  />
                </MDBox>
              </NavLink>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <NavLink key="SoilMoisture" to="/SoilMoisture">
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title="Soil Moisture"
                    description="Soil Moisture detected"
                    date={localUpdateTime.toString().slice(0, 24)}
                    chart={{
                      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                      datasets: {
                        label: "Soil Moisture",
                        data: db?.feeds?.map((item) => item.field3),
                      },
                    }}
                  />
                </MDBox>
              </NavLink>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={0}>
            {/* <Grid item xs={12} md={6} lg={8}> */}
            {/* <Projects /> */}
            <Form>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    //   placeholder="Text Field 1"

                    name="image"
                    value={imageUrl}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                {hasImage ? (
                  <Col>
                    <Image
                      height={300}
                      width={300}
                      src={fileUrl}
                      roundedCircle
                    />
                  </Col>
                ) : null}
              </Row>

              <Row>
                <Col>
                  <Button
                    block
                    variant="success"
                    disabled={isLoading}
                    onClick={!isLoading ? handlePredictClick : null}
                  >
                    {isLoading ? "Making prediction" : "Predict"}
                  </Button>
                </Col>
                <Col>
                  <Button
                    block
                    variant="danger"
                    disabled={isLoading}
                    onClick={handleCancelClick}
                  >
                    Reset prediction
                  </Button>
                </Col>
              </Row>
            </Form>
            {result === "" ? null : (
              <Row>
                <Col className="result-container">
                  <h5 id="result">{result}</h5>
                </Col>
              </Row>
            )}
            {/* </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}

      {/* {console.log(tempField)} */}
    </DashboardLayout>
  );
}

export default Dashboard;
