import React, { useState } from "react"
import PropTypes from "prop-types"

const Code = ({ duration, content }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = content => {
    const el = document.createElement(`textarea`)
    el.value = content
    el.setAttribute(`readonly`, ``)
    el.style.position = `absolute`
    el.style.left = `-9999px`
    document.body.appendChild(el)
    el.select()
    document.execCommand(`copy`)
    document.body.removeChild(el)
  }

  const delay = duration =>
    new Promise(resolve => setTimeout(resolve, duration))

  return (
    <>
      <pre
        style={{
          position: `relative`,
        }}
      >
        {content}
        <button
          onClick={async () => {
            copyToClipboard(content)
            setCopied(true)
            await delay(duration)
            setCopied(false)
          }}
          style={{
            position: `absolute`,
            top: `0`,
            right: `0`,
          }}
        >
          {copied ? `Copied` : `Copy`}
        </button>
      </pre>
    </>
  )
}

Code.prototypes = {
  content: PropTypes.string.isRequired,
  duration: PropTypes.number,
}

Code.defaultProps = {
  duration: 5000,
}

export default Code
