'use client'

// React Imports
import type { ReactNode } from 'react'
import { createContext, useState, useEffect } from 'react'

// Type Imports
import { useSearchParams } from 'next/navigation'

import axios from 'axios'

import type { ProjectType } from '@/types/apps/projectTypes'

type DataType = {
  title: string
  value: string
  icon: string
}

// ProjectContextProps type
type ProjectContextProps = {
  form: ProjectType | null
  list: ProjectType[]
  setForm:  any
  setList:  any
  setLoading:  any
  loading: boolean
  action: string
  statistics: DataType[]
}

type Props = {
  children: ReactNode
  action: string
}

// Initial Project Context
export const ProjectContext = createContext<ProjectContextProps>({
  form: null,
  list: [],
  setForm:  null,
  setList:  null,
  setLoading: null,
  loading: true,
  action: '',
  statistics: []
})

// Project Provider
export const ProjectProvider = (props: Props) => {
  
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  
  // Initial Project
  const [form, setForm] = useState<ProjectType | null>(null)
  const [list, setList] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [statistics, setStatistics] = useState<DataType[]>([])

  useEffect(() => {

    const action = props.action

    if (action === 'add') {

      setLoading(false)

    } else if ((action === 'edit' || action === 'view') && id) {

      setLoading(true)

      const fetchData = async () => {

        if (!form?.id) {
          await axios
          .get(`${`${process.env.NEXT_PUBLIC_API_URL}/general.php`}/demands/${id}`)
          .then(async (res:any) => {

            const json = res.data;   
            
            setForm(json)

          }).catch (function (error:any) {

            console.error(error);
            
            return;
          })
        }

        await setLoading(false)

      };

      fetchData()

    } else if (action === 'dashboard') {

      setLoading(true)

      const fetchData = async () => {

        if (!form?.id) {
          await axios
          .get(`${`${process.env.NEXT_PUBLIC_API_URL}/demands/statistics`}`)
          .then(async (res:any) => {

            const json = res.data;   

            setStatistics([
              {
                title: 'New',
                value: json.new,
                icon: 'tabler-news'
              },
              {
                title: 'In Progress',
                value: json.inProgress,
                icon: 'tabler-progress'
              },
              {
                title: 'Cancelled',
                value: json.cancelled,
                icon: 'tabler-cancel'
              },
              {
                value: json.concluded,
                title: 'Concluded',
                icon: 'tabler-circle-check'
              }
            ])

          }).catch (function (error:any) {

            console.error(error);
            
            return;
          })
        }

        await setLoading(false)

      };

      fetchData()

    }


  }, [form?.id, id, props.action])

  return (
    <ProjectContext.Provider
      value={{
        form,
        list,
        setForm,
        setList,
        statistics,
        setLoading,
        loading,
        action: props.action
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  )
}
