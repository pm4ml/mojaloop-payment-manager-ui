import React, { Component, FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'store/types';
import * as actions from './actions';

const dispatchProps = (dispatch: Dispatch) => ({
  onFxpConversionsMount: () => dispatch(actions.requestFxpConversionsPageData()),
});

type FxpConversionsProps = {
  onFxpConversionsMount: () => void;
};

export function loadFxpConversions(FxpConversions: FC) {
  class FxpConversionsLoader extends Component<FxpConversionsProps, {}> {
    componentDidMount() {
      this.props.onFxpConversionsMount();
    }

    render() {
      return <FxpConversions />;
    }
  }
  return connect(null, dispatchProps)(FxpConversionsLoader);
}
