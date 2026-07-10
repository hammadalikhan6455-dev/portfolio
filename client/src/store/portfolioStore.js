import { create } from 'zustand'
import { portfolioService } from '../services/portfolio.service'

export const usePortfolioStore = create((set, get) => ({
  about:       null,
  projects:    [],
  experiences: [],
  skills:      [],
  leads:       [],
  loading:     {},
  errors:      {},

  _setLoading: (key, val) => set(s => ({ loading: { ...s.loading, [key]: val } })),
  _setError:   (key, val) => set(s => ({ errors:  { ...s.errors,  [key]: val } })),

  fetchAbout: async () => {
    get()._setLoading('about', true)
    try {
      const about = await portfolioService.getAbout()
      set({ about })
    } catch (e) {
      get()._setError('about', e.message)
    } finally {
      get()._setLoading('about', false)
    }
  },

  fetchProjects: async (params) => {
    get()._setLoading('projects', true)
    try {
      const projects = await portfolioService.getProjects(params)
      set({ projects })
    } catch (e) {
      get()._setError('projects', e.message)
    } finally {
      get()._setLoading('projects', false)
    }
  },

  fetchExperiences: async () => {
    get()._setLoading('experiences', true)
    try {
      const experiences = await portfolioService.getExperiences()
      set({ experiences })
    } catch (e) {
      get()._setError('experiences', e.message)
    } finally {
      get()._setLoading('experiences', false)
    }
  },

  fetchSkills: async () => {
    get()._setLoading('skills', true)
    try {
      const skills = await portfolioService.getSkills()
      set({ skills })
    } catch (e) {
      get()._setError('skills', e.message)
    } finally {
      get()._setLoading('skills', false)
    }
  },

  fetchLeads: async (params) => {
    get()._setLoading('leads', true)
    try {
      const result = await portfolioService.getLeads(params)
      set({ leads: result.leads })
    } catch (e) {
      get()._setError('leads', e.message)
    } finally {
      get()._setLoading('leads', false)
    }
  },

  updateAbout: async (data) => {
    const about = await portfolioService.updateAbout(data)
    set({ about })
    return about
  },

  createProject: async (data) => {
    const p = await portfolioService.createProject(data)
    set(s => ({ projects: [p, ...s.projects] }))
    return p
  },

  updateProject: async (id, data) => {
    const p = await portfolioService.updateProject(id, data)
    set(s => ({ projects: s.projects.map(x => x._id === id ? p : x) }))
    return p
  },

  deleteProject: async (id) => {
    await portfolioService.deleteProject(id)
    set(s => ({ projects: s.projects.filter(x => x._id !== id) }))
  },

  createExperience: async (data) => {
    const e = await portfolioService.createExperience(data)
    set(s => ({ experiences: [e, ...s.experiences] }))
    return e
  },

  updateExperience: async (id, data) => {
    const e = await portfolioService.updateExperience(id, data)
    set(s => ({ experiences: s.experiences.map(x => x._id === id ? e : x) }))
    return e
  },

  deleteExperience: async (id) => {
    await portfolioService.deleteExperience(id)
    set(s => ({ experiences: s.experiences.filter(x => x._id !== id) }))
  },

  updateLeadStatus: async (id, status) => {
    const l = await portfolioService.updateLead(id, { status })
    set(s => ({ leads: s.leads.map(x => x._id === id ? l : x) }))
    return l
  },
}))
