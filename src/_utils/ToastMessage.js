import { toast } from 'react-semantic-toasts';

// toasts success or error messages
export const ToastMessage = {
    success: (notice) => {
      toast({
        description: notice.message,
        type: 'success',
        time: 5000
      });
    },
    error: (error) => {
      if (error) {
        toast({
          description: error.message,
          type: 'warning',
          time: 5000
        });
      }
    }
}
