'use client'

// React Imports
import { useContext } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

import {ProjectContext} from '@core/contexts/projectContext'

// Component Imports
// import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

const ProjectDevelopment = () => {
  // States
  const { form, loading, setForm } = useContext(ProjectContext)

  return (
    <Card hidden={loading}>
      <CardHeader title='Development' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
          <CustomTextField 
            select
            fullWidth 
            label='Level of Development' 
            value={form?.level ?? ''} 
            onChange={e => setForm({...form, level: e.target.value})}
          >
            <MenuItem value={`Very Low`}>Very Low</MenuItem>
            <MenuItem value={`Low`}>Low</MenuItem>
            <MenuItem value={`Medium`}>Medium</MenuItem>
            <MenuItem value={`High`}>High</MenuItem>
            <MenuItem value={`Very High`}>Very High</MenuItem>
          </CustomTextField>

          <Grid item xs={12} md={4}>
            <AppReactDatepicker
              selected={form?.startDate ? new Date(form?.startDate) : null}
              id='basic-input'
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date  | null | undefined) => setForm({...form, startDate: date})}
              placeholderText='Click to select a date'
              customInput={<CustomTextField label='Development Start' fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppReactDatepicker
              selected={form?.endDate ? new Date(form?.endDate) : null}
              id='basic-input'
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date  | null | undefined) => setForm({...form, endDate: date})}
              placeholderText='Click to select a date'
              customInput={<CustomTextField label='Development End' fullWidth />}
            />
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProjectDevelopment
