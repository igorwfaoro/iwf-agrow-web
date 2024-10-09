export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_URLS = {
  auth: {
    authenticate: () => `${API_BASE_URL}/auth/authenticate`,
    register: () => `${API_BASE_URL}/auth/register`,
    refresh: () => `${API_BASE_URL}/auth/refresh`
  },
  fields: {
    list: () => `${API_BASE_URL}/fields`,
    get: (id: string) => `${API_BASE_URL}/fields/${id}`,
    create: () => `${API_BASE_URL}/fields`,
    update: (id: string) => `${API_BASE_URL}/fields/${id}`,
    remove: (id: string) => `${API_BASE_URL}/fields/${id}`
  }
};
