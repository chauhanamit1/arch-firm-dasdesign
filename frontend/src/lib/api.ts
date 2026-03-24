import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = async () => {
  try {
    const response = await api.get('/projects', {
      params: {
        populate: '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { data: [] };
  }
};

export const getServices = async () => {
  try {
    const response = await api.get('/services', {
      params: {
        populate: '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return { data: [] };
  }
};

export const getTeamMembers = async () => {
  try {
    const response = await api.get('/team-members', {
      params: {
        populate: '*',
        sort: 'order:asc',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { data: [] };
  }
};

export const submitConsultation = async (data: any) => {
  const response = await api.post('/consultation-requests', {
    data,
  });
  return response.data;
};

export default api;
