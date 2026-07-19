import './Envelope.css'

export function Envelope({
  content,
  onOpen,
  phase,
  reduceMotion,
  sealRef,
}) {
  const isOpen = phase === 'opening' || phase === 'reading'
  const isReading = phase === 'reading'
  const isBusy = phase === 'opening' || phase === 'closing'
  const isModal = phase === 'reading' || phase === 'closing'

  return (
    <div
      className={`envelope-scene envelope-scene--${phase}`}
      data-reduced-motion={reduceMotion || undefined}
      inert={isModal}
    >
      <div className="scene-introduction">
        <p className="scene-introduction__eyebrow">Hand delivered</p>
        <h1>There is a letter for you.</h1>
      </div>

      <div className="envelope-stage">
        <div className={`envelope envelope--${phase}`}>
          <div className="envelope__back" aria-hidden="true" />

          <div
            className="envelope__paper-preview"
            aria-hidden="true"
          >
            <span className="preview__date">{content.date}</span>
            <span className="preview__flourish">❦</span>
            <span className="preview__salutation">{content.salutation}</span>
          </div>

          <div
            className="envelope__flap"
            aria-hidden="true"
          >
            <div className="flap-face flap-face--outer">
              <PostageMark />
            </div>
            <div className="flap-face flap-face--inner" />
          </div>

          <div className="envelope__pocket" aria-hidden="true" />
          <div className="envelope__edge-wear" aria-hidden="true" />

          <div className="envelope__address" aria-hidden="true">
            <span>To</span>
            <strong>{content.recipient}</strong>
            <i>wherever this may find you</i>
          </div>

          <button
            ref={sealRef}
            type="button"
            className="wax-seal"
            aria-controls="parchment-letter"
            aria-expanded={isOpen}
            aria-label={`Break the seal and open the letter for ${content.recipient}`}
            disabled={isBusy || isReading}
            tabIndex={phase === 'sealed' ? 0 : -1}
            onClick={() => onOpen()}
          >
            <span className="wax-seal__rim" aria-hidden="true" />
            <span className="wax-seal__monogram" aria-hidden="true">
              {content.sealInitial}
            </span>
            <span className="wax-seal__crack" aria-hidden="true" />
          </button>

          <div className="wax-crumbs" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="envelope-actions" aria-hidden={isReading}>
        <p className="open-hint">
          <span aria-hidden="true" />
          Press the seal to open
          <span aria-hidden="true" />
        </p>
        <button
          className="skip-link"
          type="button"
          disabled={isBusy || isReading}
          tabIndex={isReading ? -1 : 0}
          onClick={() => onOpen({ skipAnimation: true })}
        >
          {/* Read without ceremony */}
        </button>
      </div>
    </div>
  )
}

export function ParchmentLetter({
  content,
  letterRef,
  onClose,
  phase,
}) {
  return (
    <div
      className={`reading-layer reading-layer--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-salutation"
    >
      <article
        ref={letterRef}
        id="parchment-letter"
        className="parchment-letter"
        tabIndex="-1"
        aria-labelledby="letter-salutation"
      >
        <div className="parchment-letter__grain" aria-hidden="true" />
        <div className="parchment-letter__folds" aria-hidden="true" />

        <button className="fold-letter" type="button" onClick={onClose}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M3.5 6.5h13v9h-13z" />
            <path d="m3.8 7 6.2 5 6.2-5" />
          </svg>
          Fold the letter
        </button>

        <div className="letter-heading">
          <p className="letter-heading__place">{content.place}</p>
          <span className="letter-heading__ornament" aria-hidden="true">
            ❦
          </span>
          <time dateTime={content.isoDate}>{content.date}</time>
        </div>

        <div className="letter-copy">
          <h2 id="letter-salutation">{content.salutation}</h2>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="letter-signature">
            <p>{content.signoff}</p>
            <strong>{content.signature}</strong>
          </div>

          {content.postscript && (
            <p className="letter-postscript">
              <span>P.S.</span> {content.postscript}
            </p>
          )}
        </div>

        <div className="letter-finial" aria-hidden="true">
          <span />
          <b>✦</b>
          <span />
        </div>
      </article>

      <p className="escape-hint">Press Esc to fold the letter</p>
    </div>
  )
}

function PostageMark() {
  return (
    <div className="postage" aria-hidden="true">
      <div className="postage-stamp">
        <span>One penny</span>
        <svg viewBox="0 0 54 48">
          <path d="M27 41c-7-5-11-11-11-18 0-8 5-15 11-18 6 3 11 10 11 18 0 7-4 13-11 18Z" />
          <path d="M27 10v26M27 17c-5-1-8-4-10-7M27 22c5-1 9-4 11-8M27 28c-5 0-9-3-12-7M27 33c5 0 9-3 12-7" />
        </svg>
        <b>POST</b>
      </div>
      <div className="postmark">
        <span>London</span>
        <i>18 · VII</i>
      </div>
      <div className="postmark-lines">
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}
