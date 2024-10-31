import { React } from 'react';


function Form({
    title, handleOnSubmit, isValid, children, extraBtn = '', className = "form-container"
}) {
    return (
        <div className={className}>
            <h2 className="text-center mt0 pt20">{title}</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="card p20">{children}</div>
                <div className="form-button-container mt20">
                    {extraBtn || null}
                    {/* <Button isDisabled={!isValid} className="button button-primary form-button mb20">
                        Submit
                    </Button> */}
                </div>
            </form>
        </div>
    );
}

export default Form;
