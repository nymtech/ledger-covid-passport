import * as React from 'react';
import { VideoHTMLAttributes } from 'react';

export const Video = React.forwardRef<
  HTMLVideoElement,
  VideoHTMLAttributes<HTMLVideoElement>
>((props, ref) => (
  // eslint-disable-next-line jsx-a11y/media-has-caption
  <video ref={ref} {...props} />
));
