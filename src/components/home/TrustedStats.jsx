import { useState, useEffect, useRef } from 'react'
import { getSiteStats } from '../../firebase/firestore'
import styles from './TrustedStats.module.css'

function useCountUp(targetStr, isVisible) {
  const [count, setCount] = useState(0)
  const [suffix, setSuffix] = useState('')
  const hasStarted = useRef(false)

  useEffect(() => {
    // 활성화되지 않았거나, 이미 시작했거나, 데이터가 없으면 중단
    if (!isVisible || !targetStr || hasStarted.current) return

    const strValue = targetStr.toString()
    const numPart = strValue.replace(/[^0-9.]/g, '')
    const suffixPart = strValue.replace(/[0-9.,]/g, '')
    const targetNum = parseFloat(numPart)

    if (isNaN(targetNum)) {
      setCount(targetStr)
      return
    }

    setSuffix(suffixPart)
    hasStarted.current = true

    let start = 0
    const duration = 2000 // 2초 동안 재생
    const frameRate = 1000 / 60
    const totalFrames = duration / frameRate
    const increment = targetNum / totalFrames

    const timer = setInterval(() => {
      start += increment
      if (start >= targetNum) {
        setCount(targetNum)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, frameRate)

    return () => clearInterval(timer)
  }, [isVisible, targetStr]) // hasStarted는 ref이므로 의존성에서 제거

  const formatNum = (val) => {
    if (typeof val === 'string') return val
    return Math.floor(val).toLocaleString()
  }

  return formatNum(count) + suffix
}

export default function TrustedStats({ t }) {
  const [stats, setStats] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    getSiteStats().then(setStats).catch(() => {})

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before it hits view
    })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Fallback: if IntersectionObserver is delayed/missed, start counting after data is loaded.
  useEffect(() => {
    if (!stats) return
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [stats])

  if (!stats) return null

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{t?.title || 'Smarter MRI, from end to end'}</h2>
        <p className={styles.subtitle}>{t?.subtitle || 'Higher efficiency. Sharper images. Deeper insights.'}</p>
        
        <div className={styles.grid}>
          <div className={styles.statItem}>
            <div className={styles.value}><Counter value={stats.countries} isVisible={isVisible} /></div>
            <div className={styles.label}>{t?.countries || 'Countries'}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.value}><Counter value={stats.institutions} isVisible={isVisible} /></div>
            <div className={styles.label}>{t?.institutions || 'Institutions'}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.value}><Counter value={stats.scans} isVisible={isVisible} /></div>
            <div className={styles.label}>{t?.scans || 'Scans'}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.value}><Counter value={stats.reduction} isVisible={isVisible} /></div>
            <div className={styles.label}>{t?.reduction || 'Avg scan time reduction'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Counter({ value, isVisible }) {
  const displayValue = useCountUp(value, isVisible)
  return <span>{displayValue}</span>
}
