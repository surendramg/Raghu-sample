import { mockJobs } from "@/lib/mock-data"

export class JobService {
  async searchJobs(query: string, options: { limit?: number } = {}) {
    // In a real app, this would query your database
    const { limit = 10 } = options

    const filteredJobs = mockJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase()),
    )

    return filteredJobs.slice(0, limit)
  }

  async getFeaturedJobs(limit = 5) {
    return mockJobs.filter((job) => job.featured).slice(0, limit)
  }

  async getJobById(id: string) {
    return mockJobs.find((job) => job.id === id)
  }

  async getJobsByLocation(location: string, limit = 10) {
    return mockJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase())).slice(0, limit)
  }

  async getJobsByCompany(company: string, limit = 10) {
    return mockJobs.filter((job) => job.company.toLowerCase().includes(company.toLowerCase())).slice(0, limit)
  }
}
