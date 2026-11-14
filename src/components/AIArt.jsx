export default function AIArt({ src, alt, className = '', children, watermark = false }) {
  return <figure className={`ai-art ${className}`}><img src={src} alt={alt} />{children}{watermark && <span className="ai-watermark">AI-generated</span>}</figure>;
}
