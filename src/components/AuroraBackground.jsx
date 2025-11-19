export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 60% 40%, rgba(147, 51, 234, 0.4) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          animation: 'aurora 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.3) 0%, transparent 50%)
          `,
          backgroundSize: '150% 150%',
          animation: 'aurora 25s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 50% 10%, rgba(236, 72, 153, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 90% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 40%)
          `,
          backgroundSize: '180% 180%',
          animation: 'aurora 30s ease-in-out infinite',
        }}
      />
    </div>
  )
}

