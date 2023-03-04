import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import CategoryReducer from "./CategoryReducer";
import commonReducer from "./commonReducer";
import ContractorReducer from "./ContractorReducer";
import JobReducer from "./JobReducer";
import PaymentReducer from "./PaymentReducer";
import WorkerReducer from "./WorkerReducer";
const store = configureStore({
  reducer: {
    authStore: AuthReducer,
    commonStore: commonReducer,
    contractorStore: ContractorReducer,
    workerStore: WorkerReducer,
    categoryStore: CategoryReducer,
    jobStore: JobReducer,
    paymentStore: PaymentReducer,
  },
});
export default store;
