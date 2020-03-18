import React, { forwardRef, useRef } from 'react';
import styled from 'styled-components';

const FileInput = styled.input`
  display: none !important;
`;

const withFileUpload = WrappedComponent => forwardRef(({ handleUpload, ...rest }, forwardedRef) => {
    const fileRef = useRef();
    const handleChange = event => {
        const file = event.target.files[0];
        file && handleUpload(file);
    };
    return (
        <>
            <FileInput
                ref={fileRef}
                type='file'
                onChange={handleChange}
            />
            <WrappedComponent  onClick={() => fileRef.current.click()} {...rest} ref={forwardedRef}/>
        </>
    );
});

export default withFileUpload;
