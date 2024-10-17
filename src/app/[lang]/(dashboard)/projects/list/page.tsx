'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import {ProjectProvider} from '@core/contexts/projectContext'
import ProjectListTable from '@/views/apps/data-analytics/projects/list/ProjectListTable'
import ProjectCard from '@/views/apps/data-analytics/projects/list/ProjectCard'

// Data Imports
// import { getEcommerceData } from '@/app/server/actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/ecommerce` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */


const projectsList = () => {
  // Vars
  // const data = await getEcommerceData()

  return (
    <Grid container spacing={6}>
      <ProjectProvider action={'dashboard'}>
        <Grid item xs={12}>
          <ProjectCard />
        </Grid>
        <Grid item xs={12}>
          <ProjectListTable />
        </Grid>
      </ProjectProvider>
    </Grid>
  )
}

export default projectsList
