import { useMemoize } from '@vueuse/core';
import type { Context } from '@/composables/useContext';
import { $fetch } from 'ohmyfetch';

export const retrieveTokens = useMemoize(
  async (context: Context): Promise<Api.Response.Token[]> => {
    const tokens = [];
    const tokensParams = {
      ...(context.currentNetwork.value.tokensMinLiquidity != null && {
        minLiquidity: context.currentNetwork.value.tokensMinLiquidity.toString(),
      }),
      limit: '100',
    };
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const tokensResponse = await $fetch<Api.Response.Collection<Api.Response.Token>>(
        `${context.currentNetwork.value.apiUrl}/tokens?${new URLSearchParams(tokensParams).toString()}&page=${page}`,
      );
      tokens.push(...tokensResponse.items);
      page++;
      hasMore = !!tokensParams.minLiquidity && tokensResponse.meta.totalPages > tokensResponse.meta.currentPage;
    }

    return tokens;
  },
  {
    getKey(context: Context) {
      return context.currentNetwork.value.name;
    },
  },
);