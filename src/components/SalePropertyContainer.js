import { useEffect } from "react"
import Loading from "./Loading"
import SaleProperty from "./SaleProperty"
import Wrapper from "../assets/wrappers/SalePropertyContainer"
import { useAppContext } from "../context/appContext"


const SalePropertyContainer = () => {
  const { getSaleProperty, saleProperty, isLoading, page, totalSaleProperty } = useAppContext()

  useEffect(() => {
    getSaleProperty()
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  if (saleProperty.length === 0) {
    return <Wrapper >
      <h2>No Property to display</h2>

    </Wrapper>
  }

  return (
    <Wrapper>
      <h5>
        {totalSaleProperty} Property Found
      </h5>

      <div className='jobs'>
        {saleProperty.map((property) => {

          return <SaleProperty key={property._id}{...property} />

        })}
      </div>

      {/* Pagination btn */}
    </Wrapper>
  )
}

export default SalePropertyContainer
