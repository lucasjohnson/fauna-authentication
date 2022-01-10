import React from 'react';
import { IconType } from '../enums/index';
import { FaTwitter } from 'react-icons/fa';
import { GoMarkGithub } from 'react-icons/go';

const Icon: React.FC<IconProps> = ({ type }) => {
  let icon;

  switch (type) {
    case IconType.TWITTER:
      icon = <FaTwitter />;
      break;
    case IconType.GITHUB:
      icon = <GoMarkGithub />;
      break;
    default:
      return null;
  }

  return icon;
};

export default Icon;

interface IconProps {
  type: string | IconType.TWITTER | IconType.GITHUB;
}
