import React from 'react';
import PropTypes from 'prop-types';
import './PeopleSelector.scss';

import { twemojify } from '../../../util/twemojify';

import { blurOnBubbling } from '../../atoms/button/script';

import Text from '../../atoms/text/Text';
import Avatar from '../../atoms/avatar/Avatar';
import Time from '../../atoms/time/Time';

function PeopleSelector({ avatarSrc, name, color, peopleRole, onClick, ts }) {
  return (
    <div className="people-selector__container">
      <button
        className="people-selector"
        onMouseUp={(e) => blurOnBubbling(e, '.people-selector')}
        onClick={onClick}
        type="button"
      >
        <Avatar imageSrc={avatarSrc} text={name} bgColor={color} size="extra-small" />
        <Text className="people-selector__name" variant="b1">
          {twemojify(name)}
        </Text>
        {ts && (
          <div className="people-selector__ts">
            <Text variant="b3">
              <Time timestamp={ts} fullTime />
            </Text>
          </div>
        )}
        {peopleRole !== null && (
          <Text className="people-selector__role" variant="b3">
            {peopleRole}
          </Text>
        )}
      </button>
    </div>
  );
}

PeopleSelector.defaultProps = {
  avatarSrc: null,
  peopleRole: null,
};

PeopleSelector.propTypes = {
  avatarSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  peopleRole: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  ts: PropTypes.number,
};

export default PeopleSelector;
