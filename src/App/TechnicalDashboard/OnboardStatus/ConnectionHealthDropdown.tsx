import React from 'react';
import { Row, Button } from 'components';

interface ConnectionStateOption {
  label: string;
  value: string;
  color: string;
  description: string;
}

interface ConnectionHealthDropdownProps {
  connectionStateList: ConnectionStateOption[];
}

const handleRecreateOutboundTLS = () => {
  console.log('Recreate Outbound TLS button clicked');
};

const handleRecreateJWS = () => {
  console.log('Recreate JWS button clicked');
};

const formatDescription = (description: string) => {
  const match = description.match(/\(Last Updated: .*?\)/);
  if (match) {
    const mainText = description.replace(match[0], '').trim();
    let splitTextArray = mainText.split(':');
    if (splitTextArray.length > 1) {
      return (
        <>
          <span style={{ fontWeight: 'bold' }}>{splitTextArray[0]} :</span>{' '}
          <span style={{ fontWeight: 'normal' }}>{splitTextArray[1]}</span>
          <span style={{ fontWeight: 'normal' }}> {match[0]}</span>
        </>
      );
    }
    return (
      <>
        <span style={{ fontWeight: 'bold' }}>{mainText}</span>{' '}
        <span style={{ fontWeight: 'normal' }}>{match[0]}</span>
      </>
    );
  }
  return <span style={{ fontWeight: 'bold' }}>{description}</span>;
};

const ConnectionHealthDropdown: React.FC<ConnectionHealthDropdownProps> = ({ connectionStateList }) => {
  return (
    <div>
      <Row align="left top" padding="8px" style={{ marginBottom: '20px', display: 'flex', gap: '50px' }}>
        <Button onClick={handleRecreateOutboundTLS} label="Recreate Outbound TLS" kind="secondary" />
        <Button onClick={handleRecreateJWS} label="Recreate JWS" kind="secondary" />
      </Row>
      <div className="state-dropdown" style={{ width: '100%' }}>
        <div
          className="dropdown-options"
          style={{
            border: 'none',
            maxWidth: '100%',
            marginTop: '8px',
            backgroundColor: 'white',
            padding: '8px',
          }}
        >
          {connectionStateList.map(option => (
            <div
              key={option.value}
              style={{ padding: '8px', display: 'flex', alignItems: 'center' }}
            >
              <div
                className="accordion__indicator__color"
                style={{ background: option.color, width: '12px', height: '12px', borderRadius: '50%', marginRight: '10px' }}
              />
              <span style={{ minWidth: '180px', display: 'inline-block' }}>{option.label}</span>
              <span>:</span>
              <span style={{ marginLeft: '20px' }}>{formatDescription(option.description)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionHealthDropdown;
