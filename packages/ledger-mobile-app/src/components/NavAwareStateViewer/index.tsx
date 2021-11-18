import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useCoconutState } from '../../state';
import { Diagram } from './diagram';
import { useVerifierState } from '../../state/verifier';

function chunkSubstr(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}

const PopupContainer: React.FC = function ({ children }) {
  return (
    <Box py={2} px={4}>
      {children}
    </Box>
  );
};

export var NavAwareStateViewer: React.FC = function () {
  const state = useCoconutState();
  const verifierState = useVerifierState();
  const [popover, setPopover] = React.useState<React.ReactNode>();
  const handleHover = (event: React.MouseEvent<SVGGElement>) => {
    switch (event.currentTarget.id) {
      case 'hashed-attriubutes':
        setPopover(
          <PopupContainer>
            <h4>Hashed attributes</h4>
            {state.pccHashed && <pre>{JSON.stringify(state.pccHashed, null, 2)}</pre>}
          </PopupContainer>,
        );
        break;
      case 'attr-cleartext':
        setPopover(
          <PopupContainer>
            <h4>Clear text attributes</h4>
            {state.pccClearText && <pre>{JSON.stringify(state.pccClearText, null, 2)}</pre>}
          </PopupContainer>,
        );
        break;
      case 'blind-sign-req':
        {
          const bsr = {
            attributes: state.pccHashed
              ? [
                  ...Object.values(state.pccHashed),
                  '...ACCESS_CONTROL_POLICY',
                  '...VERIFIER_ATTRIBUTES(id, timestamp)',
                  '<ENCRYPTED_USER_SECRET>',
                ]
              : undefined,
            verifierKey: '<USER_PUBLIC_KEY>',
          };
          setPopover(
            <PopupContainer>
              <h4>Blind signing request</h4>
              {state.pccHashed && <pre>{JSON.stringify(bsr, null, 2)}</pre>}
            </PopupContainer>,
          );
        }
        break;
      case 'aggregated-signature':
        setPopover(
          <PopupContainer>
            <h4>Aggregated signature</h4>
            {state.signatureWithShares && <pre>{JSON.stringify(state.signatureWithShares, null, 2)}</pre>}
          </PopupContainer>,
        );
        break;
      case 'theta':
        setPopover(
          <PopupContainer>
            <h4>Theta (User QR Code)</h4>
            {state.userShowDataBase58 && <pre>{chunkSubstr(state.userShowDataBase58, 64).join('\n')}</pre>}
          </PopupContainer>,
        );
        break;
      case 'policy':
        {
          const value = {
            verifierPolicy: state.verifierPolicy,
            verifierAttributes: state.verifierAttributes,
          };
          setPopover(
            <PopupContainer>
              <h4>Access control policy</h4>
              {state.verifierPolicy && <pre>{JSON.stringify(value, null, 2)}</pre>}
            </PopupContainer>,
          );
        }
        break;
      case 'proof':
        setPopover(
          <PopupContainer>
            <h4>Verify result</h4>
            {verifierState.verifyResult && <pre>{JSON.stringify(verifierState.verifyResult, null, 2)}</pre>}
          </PopupContainer>,
        );
        break;
    }
  };
  return (
    <Box padding={2} sx={{ overflowY: 'auto', overflowX: 'auto', maxHeight: '75vh' }}>
      <Diagram onHover={handleHover} popoverChildren={popover} />
    </Box>
  );
};
