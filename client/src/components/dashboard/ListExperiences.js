import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ListExperiences = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(exp._id, "Experience")}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Experince Credentials</h2>
      {experience.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      ) : (
        <p>No experience exists !!!</p>
      )}
    </Fragment>
  );
};

ListExperiences.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ListExperiences;
