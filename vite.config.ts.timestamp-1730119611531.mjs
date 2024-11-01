// vite.config.ts
import { defineConfig } from "file:///C:/Users/sinoh/Desktop/django/Cleverio_Frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/sinoh/Desktop/django/Cleverio_Frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import rollupReplace from "file:///C:/Users/sinoh/Desktop/django/Cleverio_Frontend/node_modules/@rollup/plugin-replace/dist/es/index.js";
var __vite_injected_original_dirname = "C:\\Users\\sinoh\\Desktop\\django\\Cleverio_Frontend";
var vite_config_default = defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__vite_injected_original_dirname, "./src")
      }
    ]
  },
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("development")
      }
    }),
    react()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzaW5vaFxcXFxEZXNrdG9wXFxcXGRqYW5nb1xcXFxDbGV2ZXJpb19Gcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcc2lub2hcXFxcRGVza3RvcFxcXFxkamFuZ29cXFxcQ2xldmVyaW9fRnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3Npbm9oL0Rlc2t0b3AvZGphbmdvL0NsZXZlcmlvX0Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuLy9pbXBvcnQgcmVhY3RSZWZyZXNoIGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1yZWZyZXNoXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHJvbGx1cFJlcGxhY2UgZnJvbSBcIkByb2xsdXAvcGx1Z2luLXJlcGxhY2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIC8vIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgICAgIGZpbmQ6IFwiQFwiLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG5cclxuICBwbHVnaW5zOiBbXHJcbiAgICByb2xsdXBSZXBsYWNlKHtcclxuICAgICAgcHJldmVudEFzc2lnbm1lbnQ6IHRydWUsXHJcbiAgICAgIHZhbHVlczoge1xyXG4gICAgICAgIF9fREVWX186IEpTT04uc3RyaW5naWZ5KHRydWUpLFxyXG4gICAgICAgIFwicHJvY2Vzcy5lbnYuTk9ERV9FTlZcIjogSlNPTi5zdHJpbmdpZnkoXCJkZXZlbG9wbWVudFwiKSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgcmVhY3QoKSxcclxuICBdLFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVSxTQUFTLG9CQUFvQjtBQUV4VyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBSjFCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFFRSxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsY0FBYztBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsUUFBUTtBQUFBLFFBQ04sU0FBUyxLQUFLLFVBQVUsSUFBSTtBQUFBLFFBQzVCLHdCQUF3QixLQUFLLFVBQVUsYUFBYTtBQUFBLE1BQ3REO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
