import * as React from 'react';
import { Chip } from '@material-ui/core';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import { DateTime } from 'luxon';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import {
  HCertWrapper,
  isHCertWrapperVaccinationRecord,
} from '../../models/hcert';

interface HCertValidityProps {
  wrapper?: HCertWrapper;
}

export const HCertValidity: React.FC<HCertValidityProps> = ({ wrapper }) => {
  if (!wrapper || !isHCertWrapperVaccinationRecord(wrapper)) {
    return (
      <Chip
        icon={<WarningOutlinedIcon />}
        label="No valid vaccination certificate"
        color="error"
        sx={{ p: 1 }}
      />
    );
  }

  const date = DateTime.fromJSDate(wrapper.exp);

  if (DateTime.local() > date) {
    return (
      <Chip
        icon={<WarningOutlinedIcon />}
        label={`Expired on ${date.toFormat('dd MMM yyyy')}`}
        color="error"
        sx={{ p: 1 }}
      />
    );
  }

  return (
    <Chip
      icon={<BeenhereOutlinedIcon />}
      label={`Valid until ${date.toFormat('dd MMM yyyy')}`}
      color="success"
      sx={{ p: 1 }}
    />
  );
};
