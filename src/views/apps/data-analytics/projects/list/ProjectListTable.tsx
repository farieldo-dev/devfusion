'use client'

// React Imports
import { useEffect, useMemo, useState, useContext } from 'react'


// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'material-react-table';

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import type { TextFieldProps } from '@mui/material/TextField'

import axios from 'axios'

import CardContent from '@mui/material/CardContent';

import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';

import type { Locale } from '@configs/i18n'

// import type { ThemeColor } from '@core/types'

import {ProjectContext} from '@core/contexts/projectContext'

import type { ProjectType } from '@/types/apps/projectTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const ProjectListTable = () => {
  // States
  const { list, setList } = useContext(ProjectContext)

  const [category, setCategory] = useState<ProjectType['bu']>('')
  const [status, setStatus] = useState<ProjectType['status']>('')

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo<MRT_ColumnDef<ProjectType>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'priority',
        header: 'Priority'
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 250,
      },
      {
        header: 'Category',
        accessorKey: 'buName'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        size: 250
      },
      {
        id: 'action', //id is still required when using accessorFn instead of accessorKey
        header: 'Action',
        accessorKey: 'action',
        enableSorting: false,
        Cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton href={getLocalizedUrl(`/projects/edit?id=${row.original.id}`, locale as Locale)}>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
          </div>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!list) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      await axios
      .get(`${`${process.env.NEXT_PUBLIC_API_URL}/general.php`}/demands`, {
        params: {
          page: `${pagination.pageIndex + 1}`,
          items_per_page: `${pagination.pageSize}`,
          filter_status: status ?? '',
          filter_bu: category ?? '',
          globalFilter: globalFilter ?? '',
          sort: sorting ?? []
        }
      })
      .then(async (res:any) => {

        const json = res.data;

        setList(json.data);
        setRowCount(json.meta.totalRowCount);

      }).catch (function (error:any) {
        setIsError(true);
        console.error(error);
        
return;
      })

      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    status,
    category,
    sorting
  ]);


  return (
    <>
      <Card>
        <CardHeader title='Filters' />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                fullWidth
                id='select-status'
                value={status}
                onChange={e => setStatus(e.target.value)}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value=''>Select Status</MenuItem>
                <MenuItem value='New'>New</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Awaiting Customer Approval'>Awaiting Customer Approval</MenuItem>
                <MenuItem value='Pending Information'>Pending Information</MenuItem>
                <MenuItem value='Cancelled'>Cancelled</MenuItem>
                <MenuItem value='Concluded'>Concluded</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                fullWidth
                id='select-category'
                value={category}
                onChange={e => setCategory(e.target.value)}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value=''>Select Category</MenuItem>
                <MenuItem value='2'>Executive</MenuItem>
                <MenuItem value='3'>Commercial</MenuItem>
                <MenuItem value='1'>Defense</MenuItem>
              </CustomTextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Project'
            className='max-sm:is-full'
          />
          <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
            <CustomTextField
              select
              value={pagination.pageSize}
              onChange={e => setPagination({
                pageIndex: pagination.pageIndex,
                pageSize: Number(e.target.value),
              })}
              className='flex-auto is-[70px] max-sm:is-full'
            >
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='25'>25</MenuItem>
              <MenuItem value='50'>50</MenuItem>
            </CustomTextField>
            {/* <Button
              color='secondary'
              variant='tonal'
              className='max-sm:is-full is-auto'
              startIcon={<i className='tabler-upload' />}
            >
              Export
            </Button> */}
            <Button
              variant='contained'
              component={Link}
              className='max-sm:is-full is-auto'
              href={getLocalizedUrl('/projects/add', locale as Locale)}
              startIcon={<i className='tabler-plus' />}
            >
              Add Project
            </Button>
          </div>
        </div>
        <MaterialReactTable
          columns={columns}
          data={list}
          muiPaginationProps={{
            showRowsPerPage: false
          }}
          enableColumnPinning
          enableColumnFilters={false}
          initialState={
            { showColumnFilters: false ,
              columnPinning: { right: ['action'] }
            }
          }
          enableColumnResizing
          manualFiltering
          manualPagination
          manualSorting
          muiToolbarAlertBannerProps={
            isError
              ? {
                  color: 'error',
                  children: 'Error loading data',
                }
              : undefined
          }
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          rowCount={rowCount}
          state={{
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
          }}
        />
      </Card>
    </>
  )
}

export default ProjectListTable
