import React from 'react';

export const indicatorColor = {
  completed: '#12d670',
  inProgress: '#ff9933',
  pending: '#DDDDDD',
  inError: '#f44336',
  unknown: '#000000',
};

export let connectionStates = {
  pending: {
    color: indicatorColor.pending,
    message: 'Connecting ...',
  },
  inError: {
    color: indicatorColor.inError,
    message: 'Connection Error : ',
  },
  completed: {
    color: indicatorColor.completed,
    message: 'Connected',
  },
  inProgress: {
    color: indicatorColor.inProgress,
    message: 'Connecting ...',
  },
};

export function formatTitleCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/^./, (match) => match.toUpperCase());
}

export function formatDescription(description: string): JSX.Element {
  const match = description.match(/\(Last Updated: .*?\)/);
  if (match) {
    const mainText = description.replace(match[0], '').trim();
    const splitTextArray = mainText.split(':');
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
}


export type ConnectionStatus = keyof typeof connectionStates;
