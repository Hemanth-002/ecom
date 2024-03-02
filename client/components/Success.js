import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  padding: 60px;
  border-radius: 4px;
  display: inline-block;
  margin: 0 auto;
`;

const Background = styled.div`
  border-radius: 200px;
  height: 200px;
  width: 200px;
  background: #f8faf5;
  margin: 0 auto;
`;

const Checkmark = styled.i`
  color: #9abc66;
  font-size: 100px;
  line-height: 200px;
  margin-left: 3rem;
`;

const Happy = styled.h1`
  color: #88b04b;
  display: flex;
  justify-content: center;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 10px;
`;

const Success = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Card>
        <Background>
          <Checkmark>✓</Checkmark>
        </Background>
        <Happy>Success</Happy>
        <p>
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
      </Card>
    </div>
  );
};

export default Success;
