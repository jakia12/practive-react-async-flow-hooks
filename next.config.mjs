export const nextConfig = {
  experimental: {
    serverActions: true, // required for 'use server' + action-based forms
    actionAsyncContext: true, // enables useActionState
  },
};

export default nextConfig;
