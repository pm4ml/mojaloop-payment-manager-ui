import withErrorBoundary from 'utils/hocs/withErrorBoundary';
import { ComponentType } from 'react';
import FxpConversions from './FxpConversions';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducers';
import * as types from './types';

export default withErrorBoundary(FxpConversions as ComponentType);
export { actions, reducer, selectors, types };
