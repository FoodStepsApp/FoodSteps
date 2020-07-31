import { FETCH_FACILITY_USERS} from '../actions';

export default (state = [], action) => {
  const { payload, type } = action

  switch (type) {
    case FETCH_FACILITY_USERS:
      return payload.data;
    default:
      return state
  }
}
