import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) => {
  return (
    alerts &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div
        key={alert.id}
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-1"
        role="alert">
        <span className="block sm:inline">{alert.msg}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
      </div>
    ))
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

Alert.prototypes = {
  alert: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Alert);
