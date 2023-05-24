import moment from 'moment';
import { FaLandmark, FaDollarSign, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SaleProperty';
import SalePropertyInfo from './SalePropertyInfo';

const SaleProperty = ({ _id, title, desc, price, size, landTitle, status, createdAt }) => {

  const {
    setEditsaleProperty,
    deleteSaleProperty
  } = useAppContext()

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>

      {/* Header */}
      <header>
        {/* <Logo /> */}
        <img src='https://cdn.imgbin.com/5/11/2/imgbin-ribbon-lazo-ribbon-033vRNXgvfNByWnrmZhRkbrvD.jpg' alt='jobify' className='logo' />
        <br />
        {/* <div className='main-icon'>{title.charAt(4)}</div> */}

        <div className='info'>
          <h5>{title}</h5>
          <p>{desc.substring(0, 20)}</p>
        </div>
      </header>

      {/* Property Info */}
      <div className='content'>
        <div className='content-center'>
          <SalePropertyInfo icon={<FaLandmark />} text={landTitle} />
          <SalePropertyInfo icon={<FaCalendarAlt />} text={date} />
          <SalePropertyInfo icon={<FaDollarSign />} text={price} />

          <div className={`status ${status}`}>{status}</div>
        </div>

        {/* BTN Delete and Edit */}
        <footer>
          <div className='actions'>
            <Link to='/dashboard/add-property' className='btn edit-btn' onClick={() => setEditsaleProperty(_id)}>
              Edit
            </Link>
            <button type='buttom' className='btn delete-btn' onClick={() => deleteSaleProperty(_id)}>
              Delete
            </button>
          </div>
        </footer>
      </div>

    </Wrapper>
  )
}

export default SaleProperty
