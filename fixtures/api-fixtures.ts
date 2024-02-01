import { CommonFixtures, UseFunction } from '@fixtures';
import { ApiClient } from '../api/api-client';

export interface APIFixtures {
  api: ApiClient;
}
export const apiClientFixtures = {
  api: async ({ request }: CommonFixtures, use: UseFunction) => {
    await use(new ApiClient(request));
  },
};
