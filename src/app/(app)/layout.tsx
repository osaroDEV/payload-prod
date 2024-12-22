import './ui/styles.css'
import { ReactElement, ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps): ReactElement => {
  return (
    <html lang="en">
      <body className='bg-black text-white'>{children}</body>
    </html>
  )
}

export default RootLayout
