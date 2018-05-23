import { combineReducers } from 'redux';

import account from './account/reducer';
import profile from './profile/reducer';
import jobs from './jobs/reducer';
import skills from './skills/reducer';
import projects from './projects/reducer';
import messages from './messages/reducer';

export default combineReducers({
  account,
  profile,
  jobs,
  skills,
  projects,
  messages
});