import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <div>
          <h1 className="text-3xl">Root Layout</h1>
          { children }
        </div>
      </body>
    </html>
  )
}

export default Layout