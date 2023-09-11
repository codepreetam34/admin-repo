import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { axiosMiddleware } from "../../axiosSettings";
import HomePageBannerSlice from "../Slices/HomePageBanner/HomePageBannerSlice";
import CategorySlice from "Redux/Slices/Category/CategorySlice";
import ProductsByCaregoryIdSlice from "Redux/Slices/Products/ProductsSlice";

const rootReducer = combineReducers({
  HomePageBanner: HomePageBannerSlice,
  CategoryList: CategorySlice,
  ProductsByCatId: ProductsByCaregoryIdSlice,
});

const initializeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        axiosMiddleware
      ),
    devTools: true,
  });

export default initializeStore;
