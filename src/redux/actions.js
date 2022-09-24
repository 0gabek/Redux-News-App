import { createAction } from "@reduxjs/toolkit";

export const filtersFetching = createAction("FILTER_FETCHING");
export const filtersFetched = createAction("FILTERS_FETCHED");
export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR");
export const activeFilteredChanged = createAction("ACTIVE_FILTER_CHANGED");
