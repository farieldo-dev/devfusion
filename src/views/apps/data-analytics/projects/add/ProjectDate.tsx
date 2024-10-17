'use client'

// React Imports
import { useContext } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Component Imports
import Form from '@components/Form'
import CustomTextField from '@core/components/mui/TextField'
import { ProjectContext } from '@/@core/contexts/projectContext'

const ProjectDate = () => {

  const { form, loading, setForm } = useContext(ProjectContext)

  return (
    <Card hidden={loading}>
      <CardHeader title='Delivery' />
      <CardContent>
        <Form>
           <Grid item xs={12} md={4}>
            <AppReactDatepicker
              selected={form?.limit ? new Date(form?.limit) : null}
              id='basic-input'
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date  | null | undefined) => setForm({...form, limit: date})}
              placeholderText='Click to select a date'
              customInput={<CustomTextField label='Delivery Date' fullWidth />}
            />
          </Grid>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProjectDate
