import React from 'react';

import Container from 'react-bootstrap/Container';
import FramerNav from "./components/FramerNav";

import './App.css';
import {Col, Row} from "react-bootstrap";
import FramerEditor from "./components/FramerEditor"

const App = () => (
  <Container fluid>
      <FramerNav />
      <Container fluid className={["mt-2"]}>
          <Row>
              <Col>
                  <FramerEditor/>
              </Col>
          </Row>
      </Container>

  </Container>
);

export default App;
