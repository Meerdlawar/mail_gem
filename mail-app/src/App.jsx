import { useCallback, useEffect, useRef, useState } from 'react'
import { Envelope, ParchmentLetter } from './letter.jsx'
import { letterContent } from './letterContent.js'
import './App.css'

const OPENING_DURATION = 1420
const CLOSING_DURATION = 1080

function App() {
  const [phase, setPhase] = useState('sealed')
  const reduceMotion = usePrefersReducedMotion()
  const sealRef = useRef(null)
  const letterRef = useRef(null)
  const timerRef = useRef(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => clearTimer, [clearTimer])

  useEffect(() => {
    if (phase !== 'reading') return undefined

    const focusTimer = window.setTimeout(
      () => letterRef.current?.focus({ preventScroll: true }),
      reduceMotion ? 0 : 160,
    )

    return () => window.clearTimeout(focusTimer)
  }, [phase, reduceMotion])

  const openLetter = useCallback(
    ({ skipAnimation = false } = {}) => {
      if (phase !== 'sealed') return

      clearTimer()
      if (skipAnimation || reduceMotion) {
        setPhase('reading')
        return
      }

      setPhase('opening')
      timerRef.current = window.setTimeout(() => {
        setPhase('reading')
        timerRef.current = null
      }, OPENING_DURATION)
    },
    [clearTimer, phase, reduceMotion],
  )

  const closeLetter = useCallback(() => {
    if (phase !== 'reading') return

    clearTimer()
    if (reduceMotion) {
      setPhase('sealed')
      window.requestAnimationFrame(() => sealRef.current?.focus())
      return
    }

    setPhase('closing')
    timerRef.current = window.setTimeout(() => {
      setPhase('sealed')
      timerRef.current = null
      window.requestAnimationFrame(() => sealRef.current?.focus())
    }, CLOSING_DURATION)
  }, [clearTimer, phase, reduceMotion])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && phase === 'reading') closeLetter()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeLetter, phase])

  const statusMessage = {
    sealed: 'The letter is sealed.',
    opening: 'The seal is broken. The letter is opening.',
    reading: 'The letter is open and ready to read.',
    closing: 'The letter is being folded away.',
  }[phase]

  return (
    <main className={`experience experience--${phase}`}>
      <div className="desk-grain" aria-hidden="true" />
      <div className="pool-of-light" aria-hidden="true" />

      <header className="masthead">
        <div className="masthead__identity">
          <span className="masthead__mark" aria-hidden="true">
            A
          </span>
          <div>
            <p className="masthead__title">Private correspondence</p>
            {/* <p className="masthead__number">Filed with care · No. 07</p> */}
          </div>
        </div>
        <div className="masthead__rule" aria-hidden="true" />
        <time className="masthead__date" dateTime={letterContent.isoDate}>
          {letterContent.place} · {letterContent.date}
        </time>
      </header>

      <section className="letter-scene" aria-label="A sealed, hand-delivered letter">
        <DeskDetails />
        <Envelope
          content={letterContent}
          onOpen={openLetter}
          phase={phase}
          reduceMotion={reduceMotion}
          sealRef={sealRef}
        />

        {(phase === 'reading' || phase === 'closing') && (
          <ParchmentLetter
            content={letterContent}
            letterRef={letterRef}
            onClose={closeLetter}
            phase={phase}
          />
        )}
      </section>

      <footer className="experience-footer" aria-hidden={phase === 'reading'}>
        <span />
        <p>Some words are worth keeping.</p>
        <span />
      </footer>

      <p className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </p>
    </main>
  )
}

function DeskDetails() {
  return (
    <div className="desk-details" aria-hidden="true">
      <svg className="botanical botanical--left" viewBox="0 0 190 420">
        <path d="M149 408C138 318 110 221 45 42" />
        <path d="M112 260C67 249 43 223 20 188" />
        <path d="M128 312C91 312 67 299 39 275" />
        <path d="M88 174C112 150 125 121 130 84" />
        <path d="M62 104C79 84 84 58 82 27" />
        <path d="M46 42C32 34 24 23 21 10" />
        <ellipse cx="31" cy="202" rx="10" ry="29" transform="rotate(-52 31 202)" />
        <ellipse cx="59" cy="238" rx="9" ry="31" transform="rotate(-61 59 238)" />
        <ellipse cx="52" cy="286" rx="9" ry="28" transform="rotate(-66 52 286)" />
        <ellipse cx="86" cy="302" rx="8" ry="29" transform="rotate(-71 86 302)" />
        <ellipse cx="118" cy="128" rx="9" ry="31" transform="rotate(34 118 128)" />
        <ellipse cx="77" cy="74" rx="8" ry="27" transform="rotate(20 77 74)" />
        <circle cx="21" cy="10" r="8" />
        <circle cx="15" cy="14" r="5" />
        <circle cx="27" cy="17" r="5" />
      </svg>

      <div className="inkwell">
        <span className="inkwell__neck" />
        <span className="inkwell__glass" />
      </div>
      <div className="pen">
        <span className="pen__nib" />
        <span className="pen__shaft" />
      </div>
    </div>
  )
}

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(query.matches)

    updatePreference()
    query.addEventListener('change', updatePreference)
    return () => query.removeEventListener('change', updatePreference)
  }, [])

  return reduceMotion
}

export default App
