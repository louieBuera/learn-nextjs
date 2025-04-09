import React from 'react'

const Layout = ({
  children
}: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <div>
          <p className="text-3xl">Dashboard Layout</p>
          { children }
        </div>
      </body>
    </html>
  )
}

export default Layout;