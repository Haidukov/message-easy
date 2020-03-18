import { message } from 'antd';

class ToastNotificationService {
    showSuccess(text) {
        message.success(text);
    }

    showError(text) {
        message.error(text);
    }

    showWarning(text) {
        message.warning(text);
    }
}

export default new ToastNotificationService();
