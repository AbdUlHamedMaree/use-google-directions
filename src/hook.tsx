import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { useMemo } from 'react';

import type {
  GetGoogleMapsDirectionsArg,
  GetGoogleMapsDirectionsResponseBody,
} from './api';
import { getGoogleMapsDirections } from './api';
import {
  calculateDirectionDistanceInM,
  calculateDirectionDurationInMs,
  decodeStepsToPolylinePoints,
} from './tools';

export const useGoogleMapsDirectionsQuery = (
  arg?: GetGoogleMapsDirectionsArg,
  queryConfig?: Omit<
    UseQueryOptions<
      AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
      AxiosError,
      AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
      [GetGoogleMapsDirectionsArg?]
    >,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery<
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    AxiosError,
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    [GetGoogleMapsDirectionsArg?]
  >({
    ...queryConfig,
    queryKey: [arg],
    queryFn: ({ queryKey, signal }) => getGoogleMapsDirections(queryKey[0], { signal }),
  });

export const useGoogleMapsDirectionsMutation = (
  mutationConfig: UseMutationOptions<
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    AxiosError,
    GetGoogleMapsDirectionsArg,
    unknown
  >
) =>
  useMutation<
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    AxiosError,
    GetGoogleMapsDirectionsArg,
    unknown
  >({
    ...mutationConfig,
    mutationFn: arg => getGoogleMapsDirections(arg),
  });

export type UseDirectionPolylinePointsArg = {
  response?: GetGoogleMapsDirectionsResponseBody;
  precision?: 'low' | 'high';
};

export const useDirectionPolylinePoints = ({
  response,
  precision = 'low',
}: UseDirectionPolylinePointsArg) => {
  const points = useMemo(() => {
    if (!response) return [];

    if (response.status !== 'OK') {
      console.warn(
        `direction api response status: '${response.status}', with message: ${response.error_message}`
      );

      return [];
    }

    return precision === 'high'
      ? response.routes[0].legs[0].steps
      : [{ polyline: response.routes[0].overview_polyline }];
  }, [precision, response]);

  return useMemo(() => (points ? decodeStepsToPolylinePoints(points) : []), [points]);
};

export type UseDirectionDurationArg = {
  response?: GetGoogleMapsDirectionsResponseBody;
};

export const useDirectionDurationInMs = ({ response }: UseDirectionDurationArg) => {
  const legs = response?.routes[0].legs;

  return useMemo(() => (legs ? calculateDirectionDurationInMs(legs) : undefined), [legs]);
};

export const useDirectionDistanceInM = ({ response }: UseDirectionDurationArg) => {
  const legs = response?.routes[0].legs;

  return useMemo(() => (legs ? calculateDirectionDistanceInM(legs) : undefined), [legs]);
};
