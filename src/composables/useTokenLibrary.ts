import { ref } from 'vue';

import useContext from '@/composables/useContext';
import { retrieveTokens } from '@/composables/retrieveTokens';

export default (context = useContext()) => {
  const isRequestPending = ref(false);
  const isRequestFailed = ref(false);
  const tokens = ref<Api.Response.Token[]>([]);

  const getToken = (tokenAddress: string) => {
    return tokens.value.find((token) => token.l2Address === tokenAddress);
  };
  const getTokens = async () => {
    isRequestPending.value = true;
    isRequestFailed.value = false;
    try {
      tokens.value = await retrieveTokens(context);
    } catch {
      isRequestFailed.value = true;
    } finally {
      isRequestPending.value = false;
    }
    return false;
  };

  return {
    isRequestPending,
    isRequestFailed,
    tokens,
    getToken,
    getTokens,
  };
};
