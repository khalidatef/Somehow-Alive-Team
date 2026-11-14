export default function AIArt({ src, alt, className = '', children }) {
  return <figure className={`ai-art ${className}`}><img src={src} alt={alt} />{children}</figure>;
}
