import { React, useState } from 'react';

import { JitsiMeeting } from '@jitsi/react-sdk';
import PropTypes from 'prop-types';

import './JitsiWidget.scss';
import Text from '../../atoms/text/Text';
import useWindowDimensions from './windowDimensions';
import Draggable from 'react-draggable';
import { getUsername } from '../../../util/matrixUtil';
import initMatrix from '../../../client/initMatrix';

function JitsiWidget({ domain, conferenceId }) {
  const [active, setActive] = useState(false);
  const { windowDimensions, key } = useWindowDimensions();
  const mx = initMatrix.matrixClient;

  const meetingClicked = () => {
    console.log('hello');
    setActive(true);
  };

  const meetingClose = () => {
    setActive(false);
  };

  /*return (
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
          <Text style={{ color: 'orangered' }}>Jitsi meeting started</Text>
        </div>
      )}
    </>
  );*/

  return (
    <Draggable
      disabled={false}
      bounds={{
        left: -windowDimensions.width * 0.5 + 90,
        top: -windowDimensions.height * 0.5 + 170,
        right: windowDimensions.width * 0.5 - 250,
        bottom: windowDimensions.height * 0.5 - 40,
      }}
      key={key}
    >
      <div
        className="jitsi"
        style={{
          pointerEvents: 'all',
          padding: '0px',
          width: '300px',
          height: '200px',
          backgroundColor: 'dimgray',
        }}
      >
        <JitsiMeeting
          domain="meet.element.io"
          roomName="amogus"
          configOverwrite={{
            disableReactions: true,
            disablePolls: true,
            prejoinConfig: { enabled: false },
            liveStreaming: { enabled: false },
            maxFullResolutionParticipants: 1,
            startWithVideoMuted: true,
            disableProfile: true,
            /*toolbarButtons: [
              'camera',
              'desktop',
              'fullscreen',
              'invite',
              'microphone',
              'noisesuppression',
              'settings',
              'sharedvideo',
              'shortcuts',
              'tileview',
              'videoquality',
            ],*/

            constraints: {
              video: {
                height: {
                  ideal: 1080,
                  max: 2160,
                  min: 720,
                },
              },
            },
            maxBitratesVideo: {
              H264: {
                low: 200000,
                standard: 500000,
                high: 1500000,
              },
              VP8: {
                low: 200000,
                standard: 500000,
                high: 1500000,
              },
              VP9: {
                low: 100000,
                standard: 300000,
                high: 1200000,
              },
            },
            desktopSharingFrameRate: {
              min: 30,
              max: 60,
            },
            resolution: 1080,
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          }}
          userInfo={{
            displayName: getUsername(mx.getUserId()),
          }}
          onApiReady={(externalApi) => {
            // here you can attach custom event listeners to the Jitsi Meet External API
            // you can also store it locally to execute commands
          }}
          onReadyToClose={() => {
            // TODO: leave call
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = '96%';
          }}
        />
      </div>
    </Draggable>
  );
}

JitsiWidget.defaultProps = {
  domain: null,
  conferenceId: null,
};

JitsiWidget.propTypes = {
  domain: PropTypes.string,
  conferenceId: PropTypes.string,
};

export default JitsiWidget;
