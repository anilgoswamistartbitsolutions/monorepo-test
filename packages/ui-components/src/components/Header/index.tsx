'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react/dist/iconify.js'

// Simple header data for now - can be made configurable later
const headerData = [
  { title: 'Home', path: '/' },
  { title: 'Tours', path: '/tours' },
  { title: 'Destinations', path: '/destination' },
  { title: 'Blog', path: '/blog' },
  { title: 'Contact', path: '/contact' },
]

interface HeaderProps {
  variant?: 'default' | 'luxury' | 'adventure' | 'family';
  logoText?: string;
  logoImage?: string;
}

const Header: React.FC<HeaderProps> = ({
  variant = 'default',
  logoText = 'Holiday Deals',
  logoImage
}) => {
  const pathUrl = usePathname()
  const { theme, setTheme } = useTheme()

  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  const variantClasses = {
    default: 'text-blue-600',
    luxury: 'text-yellow-600',
    adventure: 'text-green-600',
    family: 'text-pink-600',
  }

  return (
    <header
      className={`fixed h-24 top-0 py-1 z-50 w-full transition-all ${sticky
        ? 'shadow-lg dark:shadow-darkmd bg-white dark:bg-darkmode'
        : 'shadow-none bg-transparent dark:bg-transparent'
        }`}>
      <div className='container relative mx-auto max-w-6xl flex items-center justify-between p-6'>
        {/* Logo */}
        <Link href='/' className='flex items-center'>
          {logoImage ? (
            <img src={logoImage} style={{width:"150px", height:"65px", borderRadius:"4px"}} alt={logoText} className=' absolute left-5'  />
          ) : (
            <span className={`text-2xl font-bold ${variantClasses[variant]}  ${!sticky && pathUrl === '/' ? '' : ''
              }`}>
              {logoText}
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <ul className='hidden lg:flex grow items-center justify-center gap-6'>
          {headerData.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`text-base font-medium hover:text-primary transition-colors ${pathUrl === item.path
                  ? 'text-primary'
                  : !sticky && pathUrl === '/'
                    ? ' hover:text-primary'
                    : 'text-midnight_text dark:text-white hover:text-primary'
                  }`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className='flex items-center gap-4'>
          {/* Theme Toggle */}
          <button
            aria-label='Toggle theme'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white'>
            <svg
              viewBox='0 0 16 16'
              className={`hidden h-6 w-6 dark:block ${!sticky && pathUrl === '/' && 'text-white'
                }`}>
              <path
                d='M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z'
                fill='#FFFFFF'
              />
            </svg>
            <svg
              viewBox='0 0 23 23'
              className={`h-8 w-8 text-dark dark:hidden ${!sticky && pathUrl === '/' && 'text-white'
                }`}>
              <path d='M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z' />
            </svg>
          </button>

          {/* Sign In/Up Buttons */}
          <Link
            href='/signin'
            className='hidden lg:block bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white'>
            Sign In
          </Link>
          <Link
            href='/signup'
            className='hidden lg:block bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
            Sign Up
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='block lg:hidden p-2 rounded-lg'
            aria-label='Toggle mobile menu'>
            <span className={`block w-6 h-0.5 ${!sticky && pathUrl === '/' ? 'bg-black dark:bg-white' : 'bg-black dark:bg-white'}`}></span>
            <span className={`block w-6 h-0.5 ${!sticky && pathUrl === '/' ? 'bg-black dark:bg-white' : 'bg-black dark:bg-white'} mt-1.5`}></span>
            <span className={`block w-6 h-0.5 ${!sticky && pathUrl === '/' ? 'bg-black dark:bg-white' : 'bg-black dark:bg-white'} mt-1.5`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {navbarOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50`}>
        <div className='flex items-center justify-between p-4'>
          <h2 className='text-lg font-bold text-midnight_text dark:text-white'>
            Menu
          </h2>
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label='Close mobile menu'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='dark:text-white'>
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <nav className='flex flex-col items-start p-4'>
          {headerData.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`text-base font-medium py-2 w-full ${pathUrl === item.path
                ? 'text-primary'
                : 'text-midnight_text dark:text-white hover:text-primary'
                }`}
              onClick={() => setNavbarOpen(false)}>
              {item.title}
            </Link>
          ))}
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <Link
              href='/signin'
              className='bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white text-center'
              onClick={() => setNavbarOpen(false)}>
              Sign In
            </Link>
            <Link
              href='/signup'
              className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center'
              onClick={() => setNavbarOpen(false)}>
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header 