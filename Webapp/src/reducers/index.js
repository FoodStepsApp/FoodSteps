import { combineReducers } from "redux";
import UserReducer from "./user_reducer";
import FacilityUserReducer from "./facilityUsers_reducer";

const rootReducer = combineReducers({
  user: UserReducer,
  facilityUsers: FacilityUserReducer,

});

export default rootReducer;
