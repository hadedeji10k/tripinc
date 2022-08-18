import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tooltip } from "antd";

const Wrapper: any = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px;
  height: 15px;
  background-color: ${(props) => (props.color ? props.color : "black")};
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 1;
  }
`;

const Marker = ({ text, onClick, color }) => (
  <Tooltip placement="top" title={text}>
    <Wrapper alt={text} onClick={onClick} color={color} />
  </Tooltip>
);

Marker.defaultProps = {
  onClick: (e) => {
    console.log(e);
  },
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  lng: PropTypes.string,
  lat: PropTypes.string,
  color: PropTypes.string,
};

export default Marker;
