import api from './api'

export const portfolioService = {
  /* About */
  getAbout:        ()            => api.get('/about').then(r => r.data.data),
  updateAbout:     (data)        => api.put('/admin/about', data).then(r => r.data.data),

  /* Projects */
  getProjects:     (params = {}) => api.get('/projects', { params }).then(r => r.data.data),
  getProjectBySlug:(slug)        => api.get(`/projects/${slug}`).then(r => r.data.data),
  createProject:   (data)        => api.post('/admin/projects', data).then(r => r.data.data),
  updateProject:   (id, data)    => api.put(`/admin/projects/${id}`, data).then(r => r.data.data),
  deleteProject:   (id)          => api.delete(`/admin/projects/${id}`).then(r => r.data),

  /* Experience */
  getExperiences:   ()           => api.get('/experiences').then(r => r.data.data),
  createExperience: (data)       => api.post('/admin/experiences', data).then(r => r.data.data),
  updateExperience: (id, data)   => api.put(`/admin/experiences/${id}`, data).then(r => r.data.data),
  deleteExperience: (id)         => api.delete(`/admin/experiences/${id}`).then(r => r.data),

  /* Skills */
  getSkills:       ()            => api.get('/skills').then(r => r.data.data),
  updateSkills:    (skills)      => api.put('/admin/skills', { skills }).then(r => r.data.data),

  /* Leads */
  submitLead:      (data)        => api.post('/leads', data).then(r => r.data),
  getLeads:        (params = {}) => api.get('/admin/leads', { params }).then(r => r.data.data),
  updateLead:      (id, data)    => api.put(`/admin/leads/${id}`, data).then(r => r.data.data),

  /* Media upload */
  uploadMedia: (file) => {
    const form = new FormData()
    form.append('file', file)
    return api.post('/admin/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(r => r.data.data)
  },
}
