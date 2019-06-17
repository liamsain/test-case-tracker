import React from 'react';

const DeviceStatus = ({ deviceName, value, onChange }) => (
    <div>
        {deviceName}:
        <span style={{ float: 'right' }}>
            <label className="u-display-inline-block u-margin-left">
                <input
                    type="radio"
                    name={`${deviceName}-status`}
                    checked={value === "n/a"}
                    onChange={() => onChange('n/a')}
                />n/a
        </label>
            <label className="u-display-inline-block u-margin-left">
                <input
                    type="radio"
                    name={`${deviceName}-status`}
                    checked={value === 'fail'}
                    onChange={() => onChange('fail')}
                />Fail
        </label>
            <label className="u-display-inline-block u-margin-left">
                <input
                    type="radio"
                    name={`${deviceName}-status`}
                    checked={value === "pass"}
                    onChange={() => onChange('pass')}
                />Pass
        </label>

        </span>
    </div>
);
export default DeviceStatus;