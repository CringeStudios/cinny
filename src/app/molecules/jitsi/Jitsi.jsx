import { React, useState } from 'react';

import { JitsiMeeting } from '@jitsi/react-sdk';
import PropTypes from 'prop-types';

import './Jitsi.scss';
import Text from '../../atoms/text/Text';

function Jitsi({ domain, conferenceId }) {
  const [active, setActive] = useState(false);

  const meetingClicked = () => {
    console.log('hello');
    setActive(true);
  };

  const meetingClose = () => {
    setActive(false);
  };

  return (
    <>
      {active && (
        <div className="jitsi">
          <JitsiMeeting
            className="jitsi"
            domain={domain}
            roomName={conferenceId}
            onReadyToClose={meetingClose}
          />
        </div>
      )}
      {!active && (
        <div onClick={meetingClicked}>
          <Text style={{ color: 'orangered' }}>Jitsi - Click me to join</Text>
        </div>
      )}
    </>
  );
}

Jitsi.defaultProps = {
  domain: null,
  conferenceId: null,
};

Jitsi.propTypes = {
  domain: PropTypes.string,
  conferenceId: PropTypes.string,
};

export default Jitsi;
