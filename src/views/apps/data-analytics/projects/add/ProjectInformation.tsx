'use client'

// React Imports
import { useContext, useEffect, useState } from 'react'

// MUI Imports
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import axios from 'axios'

// Third-party Imports
import classnames from 'classnames'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import type { Editor } from '@tiptap/core'

import CreatableSelect from 'react-select/creatable';

import { ProjectContext } from '@core/contexts/projectContext'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomIconButton from '@core/components/mui/IconButton'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 pbs-6 pbe-4 pli-6'>
      <CustomIconButton
        {...(editor.isActive('bold') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className={classnames('tabler-bold', { 'text-textSecondary': !editor.isActive('bold') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('underline') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className={classnames('tabler-underline', { 'text-textSecondary': !editor.isActive('underline') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('italic') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className={classnames('tabler-italic', { 'text-textSecondary': !editor.isActive('italic') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('strike') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <i className={classnames('tabler-strikethrough', { 'text-textSecondary': !editor.isActive('strike') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'left' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <i
          className={classnames('tabler-align-left', { 'text-textSecondary': !editor.isActive({ textAlign: 'left' }) })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'center' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <i
          className={classnames('tabler-align-center', {
            'text-textSecondary': !editor.isActive({ textAlign: 'center' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'right' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <i
          className={classnames('tabler-align-right', {
            'text-textSecondary': !editor.isActive({ textAlign: 'right' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'justify' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <i
          className={classnames('tabler-align-justified', {
            'text-textSecondary': !editor.isActive({ textAlign: 'justify' })
          })}
        />
      </CustomIconButton>
    </div>
  )
}

const EditorIni = ({iniText}:{iniText: string}) => {

  const { form, setForm } = useContext(ProjectContext)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],

    content: iniText,
    onUpdate({ editor }) {
      setForm({...form, description: editor?.getHTML()}) 
    },
  })

  return (
    <CardContent className='p-0'>
      <EditorToolbar editor={editor} />
      <Divider className='mli-6' />
      <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex ' />
    </CardContent>
  )
}

const ProjectInformation = () => {

  const { form, loading, setForm } = useContext(ProjectContext)
  const [optionsTag, setOptionsTag] = useState<any[]>([])

  useEffect(() => {

    const fetchData = async () => {

      if (!optionsTag.length) {
        await axios
        .get(`${`${process.env.NEXT_PUBLIC_API_URL}/general.php`}/skills`)
        .then(async (res:any) => {

          const json = res.data;

          setOptionsTag(json.map((value:any) => {
            return {
              label: value.name,
              value: value.id
            }
          }))

        }).catch (function (error:any) {

          console.error(error);
          
          return;
        })
      }
      
    };

    if (optionsTag.length === 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Card hidden={loading}>
      <CardHeader title='Project Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField fullWidth label='Title*' placeholder='' value={form?.title} onChange={e => setForm({...form, title: e.target.value})} />
            {(!(form?.title) && form?.error) && <Typography className='font-medium' color='error'>Please fill in this field</Typography>}
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextField select fullWidth label='Business Unit' 
              value={form?.bu ?? ''}
              onChange={e => setForm({...form, bu: e.target.value})}
            >
              <MenuItem value={`1`}>Defense</MenuItem>
              <MenuItem value={`2`}>Executive</MenuItem>
              <MenuItem value={`3`}>Commercial</MenuItem>
            </CustomTextField>
            {(!(form?.bu) && form?.error) && <Typography className='font-medium' color='error'>Please fill in this field</Typography>}
          </Grid>
          <Grid item xs={12} sm={12}>
            <label className='font-medium cursor-pointer' htmlFor='customizer-semi-dark'>
            Necessary skills (Select or Create)
            </label>
            <CreatableSelect
              isMulti
              onChange={e => setForm({...form, tags: e})}
              options={optionsTag}
              name="tags"
              value={form?.tags}
            />
          </Grid>
        </Grid>
        <Typography className='mbe-1'>Description (Optional)</Typography>
        <Card className='p-0 border shadow-none'>
          {(!loading) && <EditorIni iniText={form?.description ?? ''} />}
        </Card>
      </CardContent>
    </Card>
  )
}

export default ProjectInformation
