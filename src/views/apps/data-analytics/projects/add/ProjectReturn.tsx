'use client'

// React Imports
import { useContext } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

import {ProjectContext} from '@core/contexts/projectContext'

// Component Imports
// import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

const ProjectReturn = () => {
  // States
  const { form, loading, setForm } = useContext(ProjectContext)

  return (
    <Card hidden={loading}>
      <CardHeader title='Return' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
          <CustomTextField 
            select
            fullWidth 
            label='Financial feedback' 
            value={form?.financial ?? ''} 
            onChange={e => setForm({...form, financial: e.target.value})}
          >
            <MenuItem value={`0`}>None</MenuItem>
            <MenuItem value={`100`}>$100</MenuItem>
            <MenuItem value={`1000`}>$1.000</MenuItem>
            <MenuItem value={`10000`}>$10.0000</MenuItem>
            <MenuItem value={`100000`}>$100.000</MenuItem>
            <MenuItem value={`1000000`}>$1.000.000 +</MenuItem>
          </CustomTextField>

          <CustomTextField
            select
            fullWidth
            label='Return in Working Hours'
            value={form?.hours ?? ''} 
            onChange={e => setForm({...form, hours: e.target.value})}
          >
            <MenuItem value={`0`}>None</MenuItem>
            <MenuItem value={`2`}>2H</MenuItem>
            <MenuItem value={`18`}>18H</MenuItem>
            <MenuItem value={`180`}>180H</MenuItem>
            <MenuItem value={`1800`}>1800H</MenuItem>
            <MenuItem value={`18000`}>18000h +</MenuItem>
          </CustomTextField>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProjectReturn
