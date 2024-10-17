'use client'

// React Imports
import { useState, useContext } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import AsyncSelect from 'react-select/async';

import axios from 'axios'

import {ProjectContext} from '@core/contexts/projectContext'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'

const ProjectResponsibles = () => {
  // States
  const { form, loading, setForm } = useContext(ProjectContext)
  const [, setLoading] = useState<boolean>(false)

  const deleteResp = async (index:number) => {

    await setLoading(true)

    const respDelete = form?.responsibles ?? []

    respDelete.splice(index, 1)

    await setForm({...form, responsibles: respDelete})

    await setLoading(false)

  }

  const AddResp = async () => {
    
    await setLoading(true)

    const respAdd = form?.responsibles ?? []

    respAdd.push({
      value: null,
      label: null
    })

    await setForm({...form, responsibles: respAdd})

    await setLoading(false)

  }

  const handleResp = async (e:any, index:number) => {

    const newResp = (form?.responsibles ?? []).map((res:any, index2:number) => {
      if (index2 === index) {
        return e
      } else {
        return res
      }
    })

    await setForm({...form, responsibles: newResp})
  }


  const getUsers = async (inputValue: string) => {

    let searchUsers: never[] = []

    await axios
      .get(`${`${process.env.NEXT_PUBLIC_API_URL}/general.php`}/users?search=${inputValue}`)
      .then(async (res:any) => {

        const json = res.data;

        searchUsers = json.map((value:any) => {
          return {
            label: `${value.username} - ${value.name}`,
            value: value.id
          }
        })

      }).catch (function (error:any) {
        console.error(error);
        
        return;
      })

    
    return searchUsers
  };
  
  const promiseOptions = (inputValue: string) =>
    new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve(getUsers(inputValue));
      }, 1000);
  });

  return (
    <Card hidden={loading}>
      <CardHeader title='Responsibles' />
      <CardContent>
        <Grid container spacing={6}>
          {form?.responsibles?.length ? form?.responsibles?.map((item:any, index:number) => (
            <Grid key={index} item xs={12} className='repeater-item'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} alignSelf='end'>
                  <div className='flex items-center gap-6'>
                    {/* <CustomTextField fullWidth placeholder='Enter Variant Value' /> */}
                    <div style={{width: '100%'}}>
                      <AsyncSelect 
                      cacheOptions 
                      loadOptions={promiseOptions}
                      defaultOptions 
                      value={item ?? null}
                      onChange={e => handleResp(e, index)}
                      />
                    </div>
                    <CustomIconButton onClick={() => deleteResp(index)} className='min-is-fit'>
                      <i className='tabler-x' />
                    </CustomIconButton>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )) : null }
          <Grid item xs={12}>
            <Button variant='contained' onClick={() => AddResp()}  startIcon={<i className='tabler-plus' />}>
              Add Another Responsible
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProjectResponsibles
