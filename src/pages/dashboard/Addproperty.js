import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';


const Addproperty = () => {
    const {
        isLoading,
        isEditing,
        editSaleProperty,

        showAlert,
        handleChange,
        clearValues,
        createProperty,


        title,
        price,
        size,
        landTitle,
        desc,
        propertyTypeLand,
        statusOption,
        status,
        phone
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!title || !price || !size) {
        //     displayAlert()
        //     return
        // }

        if (isEditing) {
            editSaleProperty()
            // eventually edit property
            return
        }

        createProperty()

    }
    const handlePropertyInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'Edit Sale Property' : 'Add Sale Property'}</h3>
                {showAlert && <Alert />}

                <div className='form-center'>

                    {/* title */}
                    <FormRow type='text' name='title' value={title} handleChange={handlePropertyInput} />

                    {/* price */}
                    <FormRow type='number' name='price' value={price} handleChange={handlePropertyInput} />

                    {/* Size */}
                    <FormRow type='number' name='size' value={size} handleChange={handlePropertyInput} />

                    {/* Phone Number */}
                    <FormRow type='number' name='phone' value={phone} handleChange={handlePropertyInput} />

                    {/* desc */}
                    <FormRow type='textarea' name='desc' value={desc} handleChange={handlePropertyInput} />

                    {/* Land Title */}
                    <FormRowSelect name='status' labelText='Status' value={status} handleChange={handlePropertyInput} list={statusOption} />

                    {/* Property Status */}
                    <FormRowSelect name='landTitle' labelText='Land Title' value={landTitle} handleChange={handlePropertyInput} list={propertyTypeLand} />

                    {/* handle submit btn */}
                    <div className='btn-container'>
                        <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>
                            Submit
                        </button>

                        <button className='btn btn-block clear-btn' onClick={(e) => {
                            e.preventDefault()
                            clearValues()
                        }}>
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};
export default Addproperty;