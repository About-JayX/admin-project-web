import React, { Suspense, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Loading } from 'tdesign-react';
import routers, { IRouter } from 'router';
import { resolve } from 'utils/path';
import Page from './Page';
import Style from './AppRouter.module.less';

const { Content } = Layout;

type TRenderRoutes = (routes: IRouter[], parentPath?: string, breadcrumbs?: string[]) => React.ReactNode[];
/**
 * 渲染应用路由
 * @param routes
 * @param parentPath
 * @param breadcrumb
 */
const renderRoutes: TRenderRoutes = (routes, parentPath = '', breadcrumb = []) =>
  routes.map((route, index: number) => {
    const { Component, children, redirect, meta } = route;
    // 获取当前路径
    const currentPath = resolve(parentPath, route.path);
    // 面包屑导航
    let currentBreadcrumb = breadcrumb;

    if (meta?.title) {
      currentBreadcrumb = currentBreadcrumb.concat([meta?.title]);
    }
    // 重定向
    if (redirect) {
      return <Route key={index} path={currentPath} element={<Navigate to={redirect} replace />} />;
    }
    // 是否存在路由组件   ----> 配置路由菜单
    if (Component) {
      // 有路由菜单
      return (
        <Route
          key={index}
          path={currentPath}
          element={
            <Page isFullPage={route.isFullPage} breadcrumbs={currentBreadcrumb}>
              <Component />
            </Page>
          }
        />
      );
    }
    // 无路由菜单
    return children ? renderRoutes(children, currentPath, currentBreadcrumb) : null;
  });
// renderRoutes 渲染路由菜单方法
const AppRouter = () => (
  <Content>
    <Suspense
      fallback={
        <div className={Style.loading}>
          <Loading />
        </div>
      }
    >
      <Routes>{renderRoutes(routers)}</Routes>
    </Suspense>
  </Content>
);

export default memo(AppRouter);
