import { useCallback } from 'react';

export const useSubmit = (form, callback) => useCallback(event => {
    event.preventDefault();
    form.validateFields((err, values) => {
        if (!err) {
            callback(values);
        }
    });
}, [form]);
