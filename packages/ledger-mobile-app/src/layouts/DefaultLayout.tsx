import * as React from 'react';
import { Container } from '@material-ui/core';
import { PatientContainer } from '../components/PatientContainer';
import { VerifierContainer } from '../components/VerifierContainer';
import { IPhoneX } from '../components/Devices/IPhoneX';
import { useIsDesktop } from '../hooks/useIsDesktop';

export const PatientLayout: React.FC = ({ children }) => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <DesktopWrapper AppContainer={PatientContainer}>
        {children}
      </DesktopWrapper>
    );
  }

  return <>{children}</>;
};

export const VerifierLayout: React.FC = ({ children }) => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <DesktopWrapper AppContainer={VerifierContainer}>
        {children}
      </DesktopWrapper>
    );
  }

  return <>{children}</>;
};

interface DesktopWrapperProps {
  AppContainer: React.ComponentType;
}

const DesktopWrapper: React.FC<DesktopWrapperProps> = ({
  children,
  AppContainer,
}) => (
  <Container sx={{ p: 10 }}>
    <AppContainer>
      <IPhoneX>{children}</IPhoneX>
    </AppContainer>
  </Container>
);
