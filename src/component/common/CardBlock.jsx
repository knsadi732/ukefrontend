import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/blocks.css";
import ErrorHandler from "./ErrorHandler";

function CardBlock(props) {
  const { name, logo, to, onClickHandler } = props;

  try {
    return (
      <>
        <li className="cards_item">
          <div className="col-sm-6">
            <div className="card-tile shadow-long border">
              <Link
                to={to}
                style={{ textDecoration: "none" }}
                onClick={onClickHandler}
              >
                <div className="card--body">
                  <p
                    className="card--text card--size-state"
                    style={{ margin: "5px" }}
                  >
                    {logo && (
                      <img className="" src={logo} width="80%" height="80%" />
                    )}
                  </p>
                  <p className="card--text center">{name}</p>
                </div>
              </Link>
            </div>
          </div>
        </li>
      </>
    );
  } catch (error) {
    return <ErrorHandler error={error} />;
  }
}

export default CardBlock;
