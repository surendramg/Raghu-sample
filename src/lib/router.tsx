import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import App from '../App'
import { DashboardLayout } from '../components/layouts/dashboard-layout'
import { ProtectedRoute } from '../components/protected-route'

// We'll migrate these pages from app/ to src/pages/
const DashboardPage = lazy(() => import('../../app/dashboard/page').then(m => ({ default: m.default })))
const AnalyticsPage = lazy(() => import('../../app/dashboard/analytics/page').then(m => ({ default: m.default })))
const ApplicationsPage = lazy(() => import('../../app/dashboard/applications/page').then(m => ({ default: m.default })))
const BillingPage = lazy(() => import('../pages/dashboard/billing').then(m => ({ default: m.BillingPage })))
const CandidatesPage = lazy(() => import('../../app/dashboard/candidates/page').then(m => ({ default: m.default })))
const ClientsPage = lazy(() => import('../../app/dashboard/clients/page').then(m => ({ default: m.default })))
const InterviewsPage = lazy(() => import('../../app/dashboard/interviews/page').then(m => ({ default: m.default })))
const JobsPage = lazy(() => import('../../app/dashboard/jobs/page').then(m => ({ default: m.default })))
const JobDetailsPage = lazy(() => import('../../app/dashboard/jobs/[id]/page').then(m => ({ default: m.default })))
const ProfilePage = lazy(() => import('../../app/dashboard/profile/page').then(m => ({ default: m.default })))
const RequestsPage = lazy(() => import('../../app/dashboard/requests/page').then(m => ({ default: m.default })))
const SavedJobsPage = lazy(() => import('../../app/dashboard/saved-jobs/page').then(m => ({ default: m.default })))
const SettingsPage = lazy(() => import('../../app/dashboard/settings/page').then(m => ({ default: m.default })))
const UsersPage = lazy(() => import('../../app/dashboard/users/page').then(m => ({ default: m.default })))
const WhatsAppPage = lazy(() => import('../../app/dashboard/whatsapp/page').then(m => ({ default: m.default })))

const PublicJobsPage = lazy(() => import('../../app/jobs/page').then(m => ({ default: m.default })))
const PublicJobDetailsPage = lazy(() => import('../../app/jobs/[id]/page').then(m => ({ default: m.default })))
const AboutPage = lazy(() => import('../../app/about/page').then(m => ({ default: m.default })))
const BlogPage = lazy(() => import('../../app/blog/page').then(m => ({ default: m.default })))
const ContactPage = lazy(() => import('../../app/contact/page').then(m => ({ default: m.default })))
const LoginPage = lazy(() => import('../../app/auth/login/page').then(m => ({ default: m.default })))
const RegisterPage = lazy(() => import('../../app/auth/register/page').then(m => ({ default: m.default })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
          { path: '', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
          { path: 'analytics', element: <ProtectedRoute requiredRole="admin"><AnalyticsPage /></ProtectedRoute> },
          { path: 'applications', element: <ProtectedRoute><ApplicationsPage /></ProtectedRoute> },
          { path: 'billing', element: <ProtectedRoute><BillingPage /></ProtectedRoute> },
          { path: 'candidates', element: <ProtectedRoute requiredRole="employer"><CandidatesPage /></ProtectedRoute> },
          { path: 'clients', element: <ProtectedRoute requiredRole="admin"><ClientsPage /></ProtectedRoute> },
          { path: 'interviews', element: <ProtectedRoute><InterviewsPage /></ProtectedRoute> },
          { path: 'jobs', element: <ProtectedRoute requiredRole="employer"><JobsPage /></ProtectedRoute> },
          { path: 'jobs/:id', element: <ProtectedRoute requiredRole="employer"><JobDetailsPage /></ProtectedRoute> },
          { path: 'profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
          { path: 'requests', element: <ProtectedRoute><RequestsPage /></ProtectedRoute> },
          { path: 'saved-jobs', element: <ProtectedRoute><SavedJobsPage /></ProtectedRoute> },
          { path: 'settings', element: <ProtectedRoute><SettingsPage /></ProtectedRoute> },
          { path: 'users', element: <ProtectedRoute requiredRole="admin"><UsersPage /></ProtectedRoute> },
          { path: 'whatsapp', element: <ProtectedRoute requiredRole="admin"><WhatsAppPage /></ProtectedRoute> }
        ]
      },
      { path: 'jobs', element: <PublicJobsPage /> },
      { path: 'jobs/:id', element: <PublicJobDetailsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'auth/login', element: <LoginPage /> },
      { path: 'auth/register', element: <RegisterPage /> }
    ]
  }
])