import { StoredUser } from './FormattedUser';

export interface DisplayState {
  displayedUsers: StoredUser[];
  appliedRestrictions: {
    search: boolean;
    filters: boolean;
  };
}
