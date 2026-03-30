import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPost, updatePost, getPost } from '../../firebase/firestore'
import { uploadImage } from '../../firebase/storage'

const inputStyle = {
  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff',
  fontSize: '0.92rem', fontFamily: 'inherit', outline: 'none',
}

export default function AdminPostEditor() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState('kr') // kr | en
  const [form, setForm] = useState({
    title: '', titleEn: '', content: '', contentEn: '',
    category: 'notice', pinned: false, published: true,
    thumbnail: '', author: 'DYNAPEX',
  })

  useEffect(() => {
    if (isEdit) {
      getPost(id).then(data => { if (data) setForm(prev => ({ ...prev, ...data })) })
    }
  }, [id])

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleThumbnail = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const url = await uploadImage(file, `posts/${Date.now()}_${file.name}`)
      set('thumbnail', url)
    } catch (err) {
      alert('Upload failed: ' + err.message)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return alert('Title is required')
    setSaving(true)
    try {
      const data = { ...form }
      delete data.id
      if (isEdit) {
        await updatePost(id, data)
      } else {
        await createPost(data)
      }
      navigate('/admin/posts')
    } catch (err) {
      alert('Save failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 24 }}>{isEdit ? 'Edit Post' : 'New Post'}</h1>

      <form onSubmit={handleSave} style={{ maxWidth: 800 }}>
        {/* Category + Options */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: 140 }}>
            <option value="notice">Notice</option>
            <option value="news">News</option>
            <option value="event">Event</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.pinned} onChange={e => set('pinned', e.target.checked)} /> Pinned
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} /> Published
          </label>
        </div>

        {/* Language tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['kr', 'en'].map(l => (
            <button key={l} type="button" onClick={() => setTab(l)} style={{
              padding: '6px 18px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
              background: tab === l ? 'rgb(0,255,204)' : 'rgba(255,255,255,0.06)',
              color: tab === l ? '#0a1628' : 'rgba(255,255,255,0.6)',
              border: 'none', fontFamily: 'inherit',
            }}>
              {l === 'kr' ? 'Korean' : 'English'}
            </button>
          ))}
        </div>

        {/* Title */}
        <input
          value={tab === 'kr' ? form.title : form.titleEn}
          onChange={e => set(tab === 'kr' ? 'title' : 'titleEn', e.target.value)}
          placeholder={tab === 'kr' ? '제목' : 'Title (English)'}
          style={{ ...inputStyle, marginBottom: 12, fontSize: '1.1rem', fontWeight: 600 }}
        />

        {/* Content */}
        <textarea
          value={tab === 'kr' ? form.content : form.contentEn}
          onChange={e => set(tab === 'kr' ? 'content' : 'contentEn', e.target.value)}
          placeholder={tab === 'kr' ? '내용을 입력하세요 (HTML 지원)' : 'Content (English, supports HTML)'}
          rows={16}
          style={{ ...inputStyle, marginBottom: 16, resize: 'vertical', lineHeight: 1.6 }}
        />

        {/* Thumbnail */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Thumbnail</label>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {form.thumbnail && <img src={form.thumbnail} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' }} />}
            <input type="file" accept="image/*" onChange={handleThumbnail} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }} />
          </div>
        </div>

        {/* Author */}
        <input value={form.author} onChange={e => set('author', e.target.value)} placeholder="Author" style={{ ...inputStyle, marginBottom: 24, maxWidth: 280 }} />

        {/* Submit */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={{
            padding: '12px 28px', background: 'rgb(0,255,204)', border: 'none', borderRadius: 10,
            color: '#0a1628', fontSize: '0.92rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            opacity: saving ? 0.6 : 1,
          }}>
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Publish'}
          </button>
          <button type="button" onClick={() => navigate('/admin/posts')} style={{
            padding: '12px 28px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
