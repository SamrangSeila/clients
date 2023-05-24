import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  { id: 1, text: 'stats', path: '/dashboard', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all Properties', path: 'all-property', icon: <MdQueryStats /> },
  { id: 3, text: 'add property', path: 'add-property', icon: <FaWpforms /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
]

export default links
