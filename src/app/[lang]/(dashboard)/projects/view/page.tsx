'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import ProjectResponsibles from '@views/apps/data-analytics/projects/add/ProjectResponsibles'
import ProjectHeader from '@views/apps/data-analytics/projects/add/ProjectHeader'
import ProjectInformation from '@views/apps/data-analytics/projects/add/ProjectInformation'
import ProjectAttachment from '@views/apps/data-analytics/projects/add/ProjectAttachment'
import ProjectDate from '@views/apps/data-analytics/projects/add/ProjectDate'
import ProjectReturn from '@views/apps/data-analytics/projects/add/ProjectReturn'
import ProjectStatus from '@/views/apps/data-analytics/projects/add/ProjectStatus'

import {ProjectProvider} from '@core/contexts/projectContext'

const projectsAdd = () => {
  return (
    <Grid container spacing={6}>
      <ProjectProvider action={'view'}>
        <Grid item xs={12}>
          <ProjectHeader />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProjectInformation />
            </Grid>
            <Grid item xs={12}>
              <ProjectResponsibles />
            </Grid>
            <Grid item xs={12}>
              <ProjectAttachment />
            </Grid> 
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProjectStatus />
            </Grid>
            <Grid item xs={12}>
              <ProjectDate />
            </Grid>
            <Grid item xs={12}>
              <ProjectReturn />
            </Grid>
          </Grid>
        </Grid>
      </ProjectProvider>
    </Grid>
  )
}

export default projectsAdd
