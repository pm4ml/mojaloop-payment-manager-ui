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

export type ConnectionStatus = keyof typeof connectionStates;
