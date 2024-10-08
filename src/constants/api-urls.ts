export const API_BASE_URL = process.env.NEXT_API_BASE_URL;

export const API_URLS = {
  auth: {
    authenticate: () => `${API_BASE_URL}/auth/authenticate`,
    register: () => `${API_BASE_URL}/auth/register`
  },
  card: {
    getBySlug: (slug: string) => `${API_BASE_URL}/cards/${slug}`,
    create: () => `${API_BASE_URL}/cards`,
    thumbnail: (slug: string) => `${API_BASE_URL}/cards/${slug}/thumbnail`
  }
};
