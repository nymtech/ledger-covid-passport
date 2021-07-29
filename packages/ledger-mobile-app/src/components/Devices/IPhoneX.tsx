import * as React from 'react';
import './devices.css';

export interface IPhoneXProps {}

export const IPhoneX: React.FC<IPhoneXProps> = ({ children }) => (
  <div className="device device-iphone-x">
    <div className="device-frame">
      <div className="device-content" style={{ overflowY: 'auto' }}>
        {children}
      </div>
    </div>
    <div className="device-stripe" />
    <div className="device-header" />
    <div className="device-sensors" />
    <div className="device-btns" />
    <div className="device-power" />
  </div>
);
