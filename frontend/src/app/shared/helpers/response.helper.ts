import {DefaultResponseType} from "../../../types/default-response.type";


export function checkResponse<T>(data: T | DefaultResponseType): T {
  const response = data as DefaultResponseType;
  if (response.error !== undefined && response.error !== false) {
    throw new Error(response.message ?? 'Error');
  }

  return data as T;
}
