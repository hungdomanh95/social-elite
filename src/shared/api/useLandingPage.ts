import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLandingPage } from "./landing.slice";

export const useLandingPage = () => {
  const dispatch = useAppDispatch();
  const landingState = useAppSelector((s) => s.landing);

  // auto fetch lần đầu nếu chưa có data
  useEffect(() => {
    if (landingState.status === "idle" && !landingState.data) {
      dispatch(fetchLandingPage());
    }
  }, [dispatch, landingState.status, landingState.data]);

  const api = useMemo(() => {
    return {
      data: landingState.data?.data ?? null, // ✅ lấy thẳng data bên trong
      raw: landingState.data,
      loading: landingState.status === "loading",
      error: landingState.error,
      refetch: (force = false) => dispatch(fetchLandingPage({ force })),
    };
  }, [dispatch, landingState]);

  return api;
};
