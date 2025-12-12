import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/_index.tsx'),
  route('sources', 'routes/sources.tsx'),
  route('manifest.json', 'routes/[manifest.json].tsx'),
] satisfies RouteConfig
