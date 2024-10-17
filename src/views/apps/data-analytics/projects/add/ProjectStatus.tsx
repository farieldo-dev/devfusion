'use client'

// React Imports
import { useContext } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

import { Typography } from '@mui/material'

import {ProjectContext} from '@core/contexts/projectContext'

// Component Imports
// import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

const ProjectStatus = () => {
  // States
  const { form, loading, setForm } = useContext(ProjectContext)

  return (
    <Card hidden={loading}>
      <CardHeader title='Status' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
          <CustomTextField 
            select
            fullWidth 
            label='Status' 
            value={form?.status ?? ''} 
            onChange={e => setForm({...form, status: e.target.value})}
          >
            <MenuItem value={`New`}>New</MenuItem>
            <MenuItem value={`In Progress`}>In Progress</MenuItem>
            <MenuItem value={`Awaiting Customer Approval`}>Awaiting Customer Approval</MenuItem>
            <MenuItem value={`Pending Information`}>Pending Information</MenuItem>
            <MenuItem value={`Cancelled`}>Cancelled</MenuItem>
            <MenuItem value={`Concluded`}>Concluded</MenuItem>
          </CustomTextField>
          {(!(form?.status) && form?.error) && <Typography className='font-medium' color='error'>Please fill in this field</Typography>}
        </form>
      </CardContent>
    </Card>
  )
}

export default ProjectStatus
