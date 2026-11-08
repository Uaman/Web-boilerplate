export default function Loader({ text }) {
  return (
    <div className="loader" role="status">
      <span className="loader__spinner" aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
}
