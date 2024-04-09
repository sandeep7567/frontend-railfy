import { ComponentType, lazy } from "react";

export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
}

  const TaskPage = lazy(() => import("@/pages/TaskPage"));
  const NotFound = lazy(() => import("@/pages/NotFound"));
  const HistoryPage = lazy(() => import("@/pages/HistoryPage"));

const routes: RouteConfig[] = [
  { path: "/task", component: TaskPage },
  { path: "/task/:id", component: TaskPage },
  { path: "/task/:id/edit", component: TaskPage },
  { path: "/task/:id/history", component: HistoryPage },
  { path: "/task/:id/history/:historyId", component: TaskPage },
  { path: "/history", component: NotFound },
  { path: "/history/:id", component: HistoryPage },
  { path: "/not-found", component: NotFound },
];

export default routes;