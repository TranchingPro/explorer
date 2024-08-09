import useSearch from "@/composables/useSearch";

import type { RouteLocation, RouteRecordRaw } from "vue-router";

import HomeView from "@/views/HomeView.vue";
const { getSearchRoute } = useSearch();

export default [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "/newPage",
    meta: {
      title: "document.home",
    },
  },
  {
    path: "/blocks/",
    name: "blocks",
    component: () => import("@/views/BlocksView.vue"),
    meta: {
      title: "blocksView.title",
    },
  },
  {
    path: "/block/:id",
    name: "block",
    component: () => import("@/views/BlockView.vue"),
    props: true,
    meta: {
      title: "blocks.table.block",
    },
  },
  {
    path: "/transactions/",
    name: "transactions",
    component: () => import("@/views/TransactionsView.vue"),
    props: true,
    meta: {
      title: "transactionsView.title",
    },
  },
  {
    path: "/tx/:hash",
    name: "transaction",
    component: () => import("@/views/TransactionView.vue"),
    props: true,
    meta: {
      title: "transactions.transaction",
    },
  },
  {
    path: "/address/:address",
    name: "address",
    component: () => import("@/views/AddressView.vue"),
    props: true,
    meta: {
      title: "addressView.title",
    },
  },
  {
    path: "/contracts/verify",
    name: "contract-verification",
    component: () => import("@/views/ContractVerificationView.vue"),
    meta: {
      title: "contractVerification.title",
    },
  },
  {
    path: "/tokenlist",
    redirect: "tokens",
  },
  {
    path: "/tokens",
    name: "tokens",
    component: () => import("@/views/TokensView.vue"),
    meta: {
      title: "tokensView.title",
    },
  },
  {
    path: "/tools/debugger",
    name: "debugger",
    component: () => import("@/views/DebuggerView.vue"),
    meta: {
      title: "debuggerTool.title",
    },
  },
  {
    path: "/batches/",
    name: "batches",
    component: () => import("@/views/BatchesView.vue"),
    meta: {
      title: "batches.title",
    },
  },
  {
    path: "/batch/:id",
    name: "batch",
    component: () => import("@/views/BatchView.vue"),
    props: true,
    meta: {
      title: "batches.batch",
    },
  },
  {
    path: "/search",
    name: "search",
    redirect: (to: RouteLocation) => {
      const searchQueryParam = to.query?.q instanceof Array ? to.query.q.at(-1) : to.query?.q;
      if (searchQueryParam) {
        const searchRoute = getSearchRoute(searchQueryParam);
        if (searchRoute) {
          return { name: searchRoute.routeName, params: searchRoute.routeParam, query: null };
        }
      }
      return { name: "not-found", query: null };
    },
  },
  {
    path: "/newPage",
    name: "newpage",
    component: () => import("@/views/newPage/index.vue"),
    redirect: "/newPage/explorer",
    children: [
      {
        path: "explorer",
        component: () => import("@/views/newPage/explorer.vue"),
      },
      {
        path: "blocks",
        component: () => import("@/views/newPage/blocks.vue"),
      },
      {
        path: "transactions",
        component: () => import("@/views/newPage/transactions.vue"),
      },
      {
        path: "tokens",
        component: () => import("@/views/newPage/tokens.vue"),
      },
      {
        path: "legal",
        component: () => import("@/views/newPage/legal.vue"),
      },
      {
        path: "privacy",
        component: () => import("@/views/newPage/privacy.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      title: "document.home",
    },
  },
] as RouteRecordRaw[];
