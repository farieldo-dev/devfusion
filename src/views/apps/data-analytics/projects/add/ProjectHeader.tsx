'use client'

// React Imports
import { useContext } from 'react'

import { useParams } from 'next/navigation'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'

import type { Locale } from '@configs/i18n'

import { ProjectContext } from '@core/contexts/projectContext'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const ProjectHeader = () => {

  const { form, loading, setLoading, setForm } = useContext(ProjectContext)

  const { lang: locale } = useParams()

  const handlePublish = async () => {

    await setLoading(true)

    if (form?.title && form.bu && form.status) {
      
      if (form.id) {

        await axios
        .put(`${`${process.env.NEXT_PUBLIC_API_URL}/general.php`}/demands/${form.id}`, form)
        .then(async () => {

          toast.success('Successfully saved!')

        })

      } else {
        
        await axios
        .post(`${`${process.env.NEXT_PUBLIC_API_URL}/general.php`}/demands`, form)
        .then(async () => {

          toast.success('Successfully created!')

        })

      }

    } else {
      setForm({...form, error: true}) 
    }

    await setLoading(false)


  }

  return (
    <>
      <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'> 
        <div>
          <Typography variant='h4' className='mbe-1'>
            {form?.id ? 'Edit the project' : 'Add a new project'}
          </Typography>
          <Typography>Data analytics projects</Typography>
        </div>
        {
        loading ? <CircularProgress /> :
        <div className='flex flex-wrap max-sm:flex-col gap-4'>
          <Button variant='tonal' color='secondary' href={getLocalizedUrl('/projects/list', locale as Locale)}>
            Discard
          </Button>
          <Button variant='contained' onClick={() => handlePublish()}>{form?.id ? 'Save' : 'Publish'} Project</Button>
        </div>
        }
      </div>
      <ToastContainer />
    </>
  )
}

export default ProjectHeader
