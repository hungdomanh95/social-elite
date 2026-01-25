import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getLandingPage } from "@/shared/api/cms.api";
import type { LandingResponse } from "@/shared/types/landing.types";
import { readLandingCache, writeLandingCache } from "./landing.cache";

type Status = "idle" | "loading" | "succeeded" | "failed";

export type LandingState = {
  data: LandingResponse | null;
  status: Status;
  error: string | null;
  lastFetchedAt: number | null;
};

const initialState: LandingState = {
  data: null,
  status: "idle",
  error: null,
  lastFetchedAt: null,
};

/**
 * force=true => bỏ cache, gọi API ngay
 * force=false => ưu tiên cache (nếu còn TTL) rồi mới gọi API
 */
export const fetchLandingPage = createAsyncThunk<
  LandingResponse,
  { force?: boolean } | void,
  { rejectValue: string }
>("landing/fetchLandingPage", async (arg, thunkApi) => {
  const force = (arg as any)?.force === true;

  try {
    if (!force) {
      const cached = readLandingCache();
      if (cached) return cached;
    }

    const res = (await getLandingPage()) as LandingResponse;
    writeLandingCache(res);
    return res;
  } catch (e: any) {
    const msg =
      e?.response?.data?.message ||
      e?.message ||
      "Failed to fetch landing-page";
    return thunkApi.rejectWithValue(msg);
  }
});

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    clearLandingState(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
      state.lastFetchedAt = null;
    },
    setLandingData(state, action: PayloadAction<LandingResponse>) {
      state.data = action.payload;
      state.status = "succeeded";
      state.error = null;
      state.lastFetchedAt = Date.now();
      writeLandingCache(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingPage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLandingPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
        state.lastFetchedAt = Date.now();
      })
      .addCase(fetchLandingPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { clearLandingState, setLandingData } = landingSlice.actions;
export default landingSlice.reducer;
