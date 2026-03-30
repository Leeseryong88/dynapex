import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPublication, updatePublication } from '../../firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const inputStyle = {
  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff',
  fontSize: '0.92rem', fontFamily: 'inherit', outline: 'none',
}

const productOptions = [
  { value: '', label: 'None' },
  { value: 'gbm', label: 'DYNAPEX-GBM' },
  { value: 'mets', label: 'DYNAPEX-METS' },
  { value: 'aira', label: 'DYNAPEX-ARIA' },
  { value: 'ms', label: 'DYNAPEX-MS' },
  { value: 'pd', label: 'DYNAPEX-PD' },
  { value: 'stroke', label: 'Cercare-STROKE' },
  { value: 'hn', label: 'DYNAPEX-H&N' },
]

export default function AdminPubEditor() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', journal: '', authors: '', year: new Date().getFullYear(),
    doi: '', category: 'primaryTumor', type: 'paper', patentNo: '',
    productId: '', order: 0,
  })

  useEffect(() => {
    if (isEdit) {
      getDoc(doc(db, 'publications', id)).then(snap => {
        if (snap.exists()) setForm(prev => ({ ...prev, ...snap.data() }))
      })
    }
  }, [id])

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return alert('Title is required')
    setSaving(true)
    try {
      const data = { ...form, year: parseInt(form.year) || 0, order: parseInt(form.order) || 0 }
      delete data.id
      if (isEdit) {
        await updatePublication(id, data)
      } else {
        await createPublication(data)
      }
      navigate('/admin/publications')
    } catch (err) {
      alert('Save failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 24 }}>{isEdit ? 'Edit Publication' : 'New Publication'}</h1>

      <form onSubmit={handleSave} style={{ maxWidth: 700 }}>
        {/* Type + Category */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: 120 }}>
              <option value="paper">Paper</option>
              <option value="patent">Patent</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: 160 }}>
              <option value="primaryTumor">Primary Tumor</option>
              <option value="brainMetastasis">Brain Metastasis</option>
              <option value="patent">Patent</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Product</label>
            <select value={form.productId} onChange={e => set('productId', e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: 160 }}>
              {productOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Title</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Publication title" style={inputStyle} />
        </div>

        {/* Journal or Patent No */}
        {form.type === 'paper' ? (
          <>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Journal</label>
                <input value={form.journal} onChange={e => set('journal', e.target.value)} placeholder="e.g. Neuro Oncol." style={inputStyle} />
              </div>
              <div style={{ width: 100 }}>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Year</label>
                <input type="number" value={form.year} onChange={e => set('year', e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Authors</label>
              <input value={form.authors} onChange={e => set('authors', e.target.value)} placeholder="e.g. Park JE et al." style={inputStyle} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>DOI</label>
              <input value={form.doi} onChange={e => set('doi', e.target.value)} placeholder="e.g. 10.1093/neuonc/noae123" style={inputStyle} />
            </div>
          </>
        ) : (
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Patent Number</label>
            <input value={form.patentNo} onChange={e => set('patentNo', e.target.value)} placeholder="e.g. 10-2025-019224" style={inputStyle} />
          </div>
        )}

        {/* Order */}
        <div style={{ marginBottom: 24, width: 100 }}>
          <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Sort Order</label>
          <input type="number" value={form.order} onChange={e => set('order', e.target.value)} style={inputStyle} />
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={{
            padding: '12px 28px', background: 'rgb(0,255,204)', border: 'none', borderRadius: 10,
            color: '#0a1628', fontSize: '0.92rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            opacity: saving ? 0.6 : 1,
          }}>
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={() => navigate('/admin/publications')} style={{
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
